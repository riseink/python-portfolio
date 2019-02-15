# Wagtail Foundation Packages

## TODO: 

- Make sure styling/theming info is up to date


## Package Development

### Add a package from an existing repo

To add a package from an existing repo that isn't listed in
`app/src/repolist.txt`:

1. Clone the repo into `app/src/`
2. Run `./install.sh` from the project root directory to install any newly
   added packages
3. Add the package to `INSTALLED_APPS` in `app/website/settings/base.py`


### Create a new package

To create a new component package, use one of the following methods:

#### A. Using new-component.sh

The script [app/src/new-component.sh](./app/src/new-component.sh) can be used to
quickly create a new component:

1. `cd` into `app/src/` and run `./new-component.sh [<component>]` to create
   package directories and initialize the Django app. If you do not provide a
   component name, you will be prompted for one
2. `cd` into the project root directory and run `./install.sh` to install any
   newly added packages
3. Add the package to `INSTALLED_APPS` in `app/website/settings/base.py`

#### B. Manually 

**Note:** In the below steps, any reference to `{component}` should be replaced
with the desired component package name (e.g. `mediatext`).

Create the project directory `app/src/wagtail-{component}/{component}/`, then
initialize a new django app:

```
docker-compose run web ./manage.py startapp {component} src/wagtail-{component}/{component}/
```

Create `app/src/wagtail-{component}/MANIFEST.in` and add the following to it:

```
recursive-include {component}/templates *
recursive-include {component}/static *
```

Create `app/src/wagtail-{component}/setup.py` and add something similar to the
following:

```python
from setuptools import setup

setup(name='wagtail-{component}',
      version='0.1',
      description='Wagtail components for {component}',
      author='Author Name',
      author_email='author@sccadv.com',
      packages=['{component}'],
      include_package_data=True,
      url='https://bitbucket.org/sccdigital/wagtail-{component}',
      # install_requires=[
          # Add dependencies here
          # e.g. 'wagtail-base',
      # ],
      # dependency_links=[
          # Add dependency repo urls here (if applicable)
          # e.g. 'git+ssh://git@bitbucket.org/sccdigital/wagtail-base.git#egg=wagtail-base',
      # ],
      )
```

After creating the above files and directories, run `./install.sh` from the
project root directory to install any newly added packages. Once the package is
installed, add it to `INSTALLED_APPS` in `app/website/settings/base.py`.


### Creating the Bitbucket repo for a component

When creating the Bitbucket repo for a new component, select [SCC Wagtail
Modules](https://bitbucket.org/account/user/sccdigital/projects/SWM) as the
project and use the repo naming convention `wagtail-{component}` for
consistency.


### Versioning a component package

#### General Procedure

Updates to a component should be added in a feature branch. When the feature is
finished, merge the branch into `develop` using:

```
git flow feature finish <feature-branch>
```

Next, determine the new version number according to [semantic
versioning](https://semver.org/):

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> * MAJOR version when you make incompatible API changes,
> * MINOR version when you add functionality in a backwards-compatible manner,
>   and
> * PATCH version when you make backwards-compatible bug fixes.


Once the new version number is determined, update the `version` parameter in
`setup.py`:

```python
...
setup(
    ...
    version='{new.version.number}',
    ...
)
```

Commit the change in version number to the `develop` branch:

```
git commit -am "Bumped version to {new.version.number}"
```

Then create an annotated tag with a brief message explaining what was added in
the version:

```
git tag -a <new.version.number> -m "{description of update}"
```

Push the develop branch and the new tag using the `--follow-tags` command:

```
git push --follow-tags
```

Once the `develop` branch is ready to be merged into `master`, run:

```
git checkout master && git rebase develop
```

Then push the changes to the `master` branch.


#### Early Dev Stage

When a new component is created using `./new-component.sh`, the package version
in `setup.py` is set to `0.1`. This should be fine for early development (i.e.
until the component is ready for a stable release).

Once the new component package is stable, follow the steps in the previous
section using `1.0.0` as the version number.


### Integrate a component package into docker-wagtail

1. Add the package's repo name to `app/src/repolist.txt` (e.g. for the `base`
   package, add `wagtail-base`)
2. Add the package to `INSTALLED_APPS` in `app/website/settings/base.py` (if
   it isn't added already)
3. If applicable, import the package's stylesheet in
   `app/website/static/css/src/_plugins.scss`


### Run git command on all component repos

`app/src/git-each.sh` can be used to quickly run the same git command on all
wagtail component repos in `app/src/`. Example usage:

To display the status of each local repo:

```
./git-each.sh status
```

To pull from each remote:

```
./git-each.sh pull
```

**Note:** Requires git version 1.8.5 or greater to use `git -C <directory>`.


### Package stylesheets

Packages include core stylesheets for components. These stylesheets are imported
in `app/website/static/css/src/_plugins.scss`.

#### Theming components

Sass variables for component styles can be overridden in
`app/website/static/css/src/shared/_vars.scss`.

Themes or override styles for a component are imported after the base stylesheet
in `app/website/static/css/src/_plugins.scss`. These stylesheets are located in
`app/website/static/css/src/plugins/`.


## Package Setup Details

### repolist.txt

Component packages are listed in `app/src/repolist.txt` in the following format:

```
<component>
```

Or:

```
<component>@<tag>
```

Where:

* `<component>` is the name of the component's repo (e.g. `wagtail-base`)
* `<tag>` is an optional git tag used to specify the version of the package to
  install for production. (e.g. `wagtail-base@1.0.0`) If `@<tag>` is omitted,
  production will pull the lastest commit to the master branch when installing
  the component

Lines beginning with `#` are ignored when installing packages.

The differences between how these packages are installed on dev and production
are documented in the following sections.


### Dev Environment

When `install.sh` is run, it determines the repo url based on the component
names in `repolist.txt` and clones them into a subdirectory of `app/src/` on the
host before building the container. Any git tags listed in `repolist.txt` are
ignored in dev.

When mapping a volume on a container to a directory on the host machine, Docker
is unable to install local packages using `pip install -e` during build, as it's
unable to create or modify files on the host machine. Using a solution based on
the one in [this blog
post](https://thekev.in/blog/2016-11-18-python-in-docker/index.html):

* `install.sh` adds the project root for each repo in `app/src/` to the
  `PYTHONPATH` environment variable (passed to `docker-compose build` as a
  build arg)
* `app/Dockerfile` installs each package using `setup.py develop` and creates
  the necessary files in `/usr/local/lib/python3.6/site-packages`

Error messages appear during installation, but the packages are still installed
correctly and are accessible in Wagtail apps.


### Production Environment

To prevent package updates from breaking a site in production, the packaging
setup is modified to allow locking package versions to a specific git tag. When
`install.sh --prod` is run, it determines the repo URL based on the components
and their optional git tags in `repolist.txt`. During the build, it creates the
file `/app/private_requirements.txt` in the container, which is a `pip`
requirements file with the private repo URLs for component packages. Each line
is formatted like so:

```
-e git+ssh://git@bitbucket.org/sccdigital/<component>.git@<tag>#egg=<component>
```

Or, if not tag is specified:

```
-e git+ssh://git@bitbucket.org/sccdigital/<component>.git#egg=<component>
```

In order for this setup to work, the `/app` directory in the production
container is no longer mapped to a directory on the host. Its contents are
copied from the host when `./install --prod` is run and `pip` installs
`private_requirements.txt` during the build. Local changes to packages in
`app/src/` are not mirrored in the production container, so applying updated
component packages requires the git tag in `repolist.txt` to be updated and
`./install --prod` to be run again.

