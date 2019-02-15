# Docker Wagtail

## TODO:

* document install-requirements.sh, requirements-dev.txt
* info on generating docs


## Overview

### Dev Environment Setup

These steps are for setting up the development environment. For production
instructions, see [Production Environment
Setup](#markdown-header-production-environment-setup).

0. Ensure that the host machine's public key is added to your Bitbucket account
   (**Bitbucket settings** > **SSH keys** > **Add key**)
1. Clone this repo and  run `./install.sh` from the root directory. This
   will clone packages in private repositories into `app/src/` and build the
   docker image
2. Run command `docker-compose up` to start the images
3. Run `docker-compose exec db mysql -u root -p --execute="CREATE DATABASE
   wagtail"` and enter the root user password defined in
   [docker-compose.yml](./docker-compose.yml) when prompted to create a
   database named "wagtail" in the mysql container
4. Run command `docker-compose run web ./manage.py migrate` to create
   database tables
5. Run command `docker-compose run web ./manage.py createsuperuser` to create
   an admin account for logging into the CMS
6. Run command `docker-compose run web npm install` to create `node_modules/`
   and install npm packages
7. Run command `docker-compose exec web npm start` to build and watch CSS and JS bundles.
8. In your browser, navigate to your docker ip address with port 8000 to see
   the home page

### Admin Login

The admin login is available at `/admin` and the username and password are what
you created in step 6 of "Setup".

### Wagtail Documentation

Documentation for Wagtail can be found
[here](http://docs.wagtail.io/en/v2.0.1/index.html).


## Development Workflow

### Git

Use the [Gitflow branching model](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
when working with this repository. Create feature branches when making changes
or adding features. When finished with a feature branch, merge it into the
develop branch. Once the develop branch is in a stable state, create a pull
request to merge it in to the master branch.

### Component Package Development

See [COMPONENTS.md](./COMPONENTS.md).

### Updating Component Packages

`cd` into `app/src/` and run `./update-components.sh` to pull changes for all
package repos and clone any new packages added to `repolist.txt`.

### Updating Static Bundles

Changes to static bundles are not tracked by git to avoid unnecessary conflicts
when pulling changes. To ensure bundles are updated after changes are made to
Sass/JavaScript files, run the following command to enable watch mode:

```
docker-compose exec web npm start
```

**Note:** Using `docker-compose exec` instead of `docker-compose run` so the
process can be stopped with Ctrl + C (`docker-compose run` was ignoring Ctrl + C
when testing this setup)


## Backup/Restore Database

The `backup/` directory at the project root includes convenience scripts for
backing up and restoring the database.

### Create a Backup File

To create an sql dump file of the current database state:

```
cd backup/
./db-backup.sh
```

`backup/.gitignore` is configured so `.sql` files won't be tracked by git.

### Restoring a Backup File

To restore a backup:

```
cd backup/
./db-restore.sh <backup_file.sql>
```

Where `<backup_file.sql>` is an sql dump created with `db-backup.sh`.


## Using S3 for Media/Static File Storage

These steps are based on [this
article](https://wagtail.io/blog/amazon-s3-for-media-files/).

### 1. AWS Setup

#### Create an IAM User

1. Go to the [IAM Users dashboard](https://console.aws.amazon.com/iam/home#/users)
   and click **Add user**.
2. Fill out the **User name** field. For the **Access type** field, select
   **Programmatic access**.
3. Continue to step 4 of the user creation process. Once there, click **Download
   .csv** to get the secret key for the new user.

#### Create the S3 Bucket

1. Go to the [S3 Management
   dashboard](https://s3.console.aws.amazon.com/s3/home?region=us-east-1) and
   click **Create bucket** and go through the creation process.
2. Once the new bucket has been created, go to **Permissions** > **Bucket
   Policy**.
3. Paste the following into the text area, then make the following changes to
   it:
    * Replace any occurrence of `{{BUCKET_NAME}}` with the name
      of the bucket you created.
    * Replace any occurrence of `{{USER_ARN}}` with the **User ARN** for the
      IAM user you created in the previous section.

```json
{
	"Version": "2008-10-17",
	"Statement": [
		{
			"Sid": "PublicReadForGetBucketObjects",
			"Effect": "Allow",
			"Principal": {
				"AWS": "*"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::{{BUCKET_NAME}}/*"
		},
		{
			"Effect": "Allow",
			"Principal": {
				"AWS": "{{USER_ARN}}"
			},
			"Action": "s3:*",
			"Resource": [
				"arn:aws:s3:::{{BUCKET_NAME}}",
				"arn:aws:s3:::{{BUCKET_NAME}}/*"
			]
		}
	]
}
```

Click save after making the above changes. Click **CORS configuration** and
verify that it matches the following:

```
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>Authorization</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```


### 2. Configure Environment Variables

#### Storing AWS Credentials

Edit the file `env/aws.env` and set the AWS environment variables accordingly:

```
AWS_STORAGE_BUCKET_NAME={{BUCKET_NAME}}
AWS_ACCESS_KEY_ID={{ACCESS_KEY_ID}}
AWS_SECRET_ACCESS_KEY={{SECRET_ACCESS_KEY}}
```

Where:

* `{{BUCKET_NAME}}` is the name of the S3 bucket
* `{{ACCESS_KEY_ID}}` is the access key ID for the user (found in
  *credentials.csv*)
* `{{SECRET_ACCESS_KEY}}` is the secret access key for the user (found in
  *credentials.csv*)


#### Enabling S3 Storage

To enable S3 by default for dev and production, uncomment the corresponding
environment variables in `aws.env`:

```
ENABLE_AWS_MEDIA_STORAGE=True  # <-- Enable for media files
ENABLE_AWS_STATIC_STORAGE=True # <-- Enable for static files
```

After setting `ENABLE_AWS_MEDIA_STORAGE=True`, any new images or media files
will be stored on S3. If you have existing files in `app/media/` that needs to
be moved to the S3 bucket, see section 4 below for instructions.

After setting `ENABLE_AWS_STATIC_STORAGE=True`, running `./manage.py
collectstatic` will put static files in the S3 bucket. This command should be
run once after altering the settings to put the initial files in the bucket.

**Note:** Dev and production environments can be configured independently from
one another by editing `env/dev.env` and `env/production.env`, respectively.
This can be used to override the default configuration in `env/aws.env`, or to
only enable S3 storage in a specific environment.


### 3. Wagtail Setup

#### Install Prerequisite Packages

This setup requires that the `django-storages` and `boto3` packages are
installed on the docker instance. These should be installed via
`requirements.txt`. If your docker instance is based on an older version of the
repo, run `./install.sh` again from the root directory to install these
prerequisites.

#### Django Settings

The corresponding Django settings are set based on the environment variables
configured in Section 2, so no additional changes should be necessary.


### 4. (Optional) Moving Local Media Files to AWS

If you need to get existing media files from your local machine to AWS, use one
of the following methods:

#### A. Manually

1. Go to the [S3 Management
   dashboard](https://s3.console.aws.amazon.com/s3/home?region=us-east-1) and
   click the bucket used for media storage to view its contents.
2. For each subfolder of `app/media/` on your local machine (e.g.
   `original_images`):
    * Create a folder on the S3 bucket with the same name.
    * Open the new folder, click **Upload**, and upload all files from the
      corresponding local folder.

The contents and folder structure of the S3 bucket should match your local
`app/media/` directory.

#### B. Using AWS CLI

If you have the [AWS
CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
installed, run:

```
cd app/media/
aws s3 sync . "s3://{{BUCKET_NAME}}/media/"
```

Where `{{BUCKET_NAME}}` is the name of the S3 bucket.


### 5. Final Steps

After making the changes in the previous steps, you'll need to run
`./install.sh` to update the container.

To ensure these changes take effect, restart your docker instance by running the
following:

```
docker-compose down && docker-compose up -d
```


## Production Environment

### Overview of Differences

#### Commands

`install.sh` can be run with the `--prod` (or `-p`) argument to build the
container for production:

```
./install.sh --prod
```

**Note:** In production, `/app` isn't mapped to a volume on the host (more
details on that in the following section). Instead, files are copied from
`./app` during build Because of this, `./install.sh --prod` will need to be run
whenever code changes need to be applied.

After building the production image, most `docker-compose` commands will need to
specify `docker-compose-production.yml` as the compose file using the `-f`
argument:

```
docker-compose -f docker-compose-production.yml <command>
```


#### Configuration Files

* [env/production.env](./env/production.env): Environment variables for
  production. Used to configure database settings, S3 storage, secret keys.

* [docker-compose-production.yml](./docker-compose-production.yml): Docker
  compose setup for production. For most `docker-compose` commands, this file
  must be specified with the `-f` argument when running commands on production.
    * **Note:** In order to install component packages in the container, the
      `/app` volume isn't mapped to `./app` for production

* [app/website/settings/production.py](./app/website/settings/production.py):
  Django settings for production. Several configurations are handled by
  environment variables (database info, AWS settings, etc), but other
  configurations (e.g. `ALLOWED_HOSTS`) are configured here.
    * **Note:** Since `DEBUG` should be set to `False` in production, Django
      won't serve static files, so S3 storage should be configured before going
      into production.


#### Component Packages

In production, component packages are installed using `pip` from within the
container (rather than getting pulled in on the host machine). This allows
specific version tags to be specified so only the required version of each
package gets installed. For details on how to specify a version tag for a
package, see the **repolist.txt** section in [COMPONENTS.md](./COMPONENTS.md).

Since packages are getting pulled into the container instead of the host,
additional ssh configuration is required. Setup instructions are documented
in [1. SSH Keys](#markdown-header-1-ssh-keys).


### Production Environment Setup

#### 0. Prerequisites

Since `DEBUG` should be set to `False` in production, Django won't serve static
files, so S3 storage should be configured before going into production. See [AWS
Setup](#markdown-header-1-aws-setup) before continuing.


#### 1. SSH Keys

The docker container uses the ssh keys stored in `app/etc/`. It is recommended
that you remove the existing keys from that directory and generate new ones:

```bash
cd app/etc/
rm id_rsa id_rsa.pub
# NOTE: Leave the password blank for this key
ssh-keygen -t rsa -f ./id_rsa
```

**Note:** The password for the newly generated keys should be left blank,
otherwise the scripted install will get hung up when prompted for a password.

After generating a new pair of ssh keys, add the public key to the SCC Digital
group in Bitbucket (or a user with access to Wagtail component repos).


#### 2. Configurations

Docker compose settings are configured in `docker-compose-production.yml`. Some
changes might need to be made for the production environment (e.g. if the site
is going to use RDS instead of the `db` container).

Environment variables can be configured in `env/production.env`. Most sites will
likely need the database info (hostname, credentials, etc) and S3 storage
environment variables to be set here. This is also where the secret key for
Django is declared. For security purposes, you should **remove the `SECRET_KEY`
value** that is declared there and generate a new one before going into
production.

In `app/website/settings/production.py`, set `ALLOWED_HOSTS` to include the
following:

```python
ALLOWED_HOSTS = [
    '{{domain}}.com', 'beta.{{domain}}.com', 'www.{{domain}}.com'
]
```

Where `{{domain}}` is the site's domain.

For any other Django configurations not set through environment variables,
you'll also want to set them in `settings/production.py`.


**TODO:** Figure out the following and document

* Document `ALLOWED_HOSTS` configuration ([see this
  issue](https://github.com/wagtail/wagtail/issues/3546#issuecomment-311585355))
* Update Wagtail site settings to match


#### 3. Lock Component Package Versions

By default, packages in `app/src/repolist.txt` do not have a specific
tag set, so the most recent commit will always be pulled during the install. To
ensure the production site doesn't encounter issues from future package
releases, add git tags for each component that is known to work with the site.
The URLs should be formatted like this:

```
<component>@<tag>
```

Where `<component>` is the component package and `<tag>` is a known stable git
tag (or commit hash, if necessary). See [COMPONENTS.md](./COMPONENTS.md) for
details on `repolist.txt`.

To generate a new `repolist.txt` with component packages locked to their current
version, `cd` into `app/src/` and run:

```
./lock-components.sh
```

This script iterates through all local component repos and determines the
closest tag to each repo's HEAD. E.g. if the repo is on the most recent commit
to `master`, this will likely be the most recent tagged version, or if a
specific tag is checked out in `git`, it will use that tag.

`lock-components.sh` backs up the current `repolist.txt` to a new file
`repolist.txt.BAK.<timestamp>`. The `--no-backup` (or `-b`) argument can be used
to overwrite `repolist.txt` without backing it up.

For more details, see the inline documentation in
[lock-repos.sh](app/src/lock-repos.sh).


#### 4. Install

Once everything is configured, build the production container by running the
following from the project root:

```
./install.sh --prod
```

After building the container, run the following to start it:

```
docker-compose -f docker-compose-production.yml up -d
```

**Note:** The `-d` flag runs docker in detached mode so the server continues
running after the ssh session is ended.

Apply migrations:

```
docker-compose -f docker-compose-production.yml run --rm web ./manage.py migrate
```

**Note:** The `--rm` flag removes the container after running.

Since `DEBUG` should be set to `False` on production, you'll need to collect
static files in the S3 bucket and build webpack bundles:

```
docker-compose -f docker-compose-production.yml run --rm web ./manage.py collectstatic
docker-compose -f docker-compose-production.yml exec web npm run build
```


### Switching Back to Dev Environment

To rebuild the container using the dev environment setup, just run:

```
./install.sh
```

And start the container using:

```
docker-compose up
```

**Note:** If your production environment uses an external database (e.g. RDS),
or if only your production environment is configured to use S3 storage, your
dev environment might be out of date from production. You'll need to get an SQL
dump of the database and/or download media files into your local `media`
directory to get the environments to match.


#### (Optional) Reset repolist.txt

If for whatever reason you want to generate a new `repolist.txt` that doesn't
lock any component versions, run:

```
./lock-components.sh --reset
```

