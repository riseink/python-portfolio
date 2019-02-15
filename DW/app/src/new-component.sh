#!/usr/bin/env bash

# ==============================================================================
# Initializes a new Django app for a new Wagtail component.
#
# Creates directory app/src/wagtail-{component}/{component}, calls ./manage.py
# startapp to initialize the app, and creates MANIFEST.in and setup.py files
# for the package.
# If no package name is provided as an argument, user will be prompted for one.
#
# Usage: ./new-component.sh [<package name>]
# ==============================================================================

if [[ $# -eq 0 ]]; then
    read -p "Enter component package name and press ENTER: " PKGNAME
else
    PKGNAME="$1"
fi

# Sanitize user input:
#   - Trim whitespace
#   - Check for and remove wagtail- prefix
#   - Replace spaces/hyphens with underscores
#   - Remove any remaining non-alphanumeric/underscore characters
VALIDATED_PKGNAME="$(echo -e "${PKGNAME}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^wagtail-//g' -E -e 's/[[:space:]]+|-+/_/g' -e 's/[^a-zA-Z0-9_]//g')"
# Exit if validated name is empty/only contains underscores
if [ "${VALIDATED_PKGNAME//_}" == "" ]; then
    echo "Package name '$PKGNAME' could not be validated."
    echo "Please provide a name using alphanumeric characters and underscores."
    unset PKGNAME VALIDATED_PKGNAME
    exit
fi
# Alert user if name changed during validation
if [ "$PKGNAME" != "$VALIDATED_PKGNAME" ]; then
    echo "Name changed to '$VALIDATED_PKGNAME' for compatibility."
fi

echo "Creating package directory..."
PROJNAME="wagtail-${VALIDATED_PKGNAME}"
PKGDIR="${PROJNAME}/${VALIDATED_PKGNAME}"
mkdir -p "$PKGDIR"
echo "Starting Django app..."
docker-compose run web ./manage.py startapp "$VALIDATED_PKGNAME" "src/${PKGDIR}"
echo "Creating ${PROJNAME}/MANIFEST.in..."
echo -e "recursive-include ${VALIDATED_PKGNAME}/templates *\nrecursive-include ${VALIDATED_PKGNAME}/static *" > "${PROJNAME}/MANIFEST.in"
echo "Creating ${PROJNAME}/setup.py..."
touch "${PROJNAME}/setup.py"
echo -e "from setuptools import setup\n\n" >> "${PROJNAME}/setup.py"
echo -e "setup(name='${PROJNAME}'," >> "${PROJNAME}/setup.py"
echo -e "      version='0.1'," >> "${PROJNAME}/setup.py"
echo -e "      # TODO: uncomment and set description, author, and author_email" >> "${PROJNAME}/setup.py"
echo -e "      # description='Wagtail components for ${PKGNAME}'," >> "${PROJNAME}/setup.py"
echo -e "      # author=''," >> "${PROJNAME}/setup.py"
echo -e "      # author_email=''," >> "${PROJNAME}/setup.py"
echo -e "      packages=['${VALIDATED_PKGNAME}']," >> "${PROJNAME}/setup.py"
echo -e "      include_package_data=True," >> "${PROJNAME}/setup.py"
echo -e "      url='https://bitbucket.org/sccdigital/${PROJNAME}'," >> "${PROJNAME}/setup.py"
echo -e "      # install_requires=[" >> "${PROJNAME}/setup.py"
echo -e "          # Add dependencies here" >> "${PROJNAME}/setup.py"
echo -e "          # e.g. 'wagtail-base'," >> "${PROJNAME}/setup.py"
echo -e "      # ]," >> "${PROJNAME}/setup.py"
echo -e "      # dependency_links=[" >> "${PROJNAME}/setup.py"
echo -e "          # Add dependency repo urls here (if applicable)" >> "${PROJNAME}/setup.py"
echo -e "          # e.g. 'git+ssh://git@bitbucket.org/sccdigital/wagtail-base.git#egg=wagtail-base'," >> "${PROJNAME}/setup.py"
echo -e "      # ]," >> "${PROJNAME}/setup.py"
echo -e "      )" >> "${PROJNAME}/setup.py"

echo "Creating .gitignore file..."
cat << EOT >> "${PROJNAME}/.gitignore"
.DS_Store
*.pyc
*.egg-info
/dist
*.log
/logs
/data
__pycache__
/media
node_modules
*.iml
.idea
EOT

echo "Creating empty README.md..."
echo -e "# ${PROJNAME}\n" >> "${PROJNAME}/README.md"


echo -e "\nComponent initialized."
echo "Edit metadata in ${PROJNAME}/setup.py to finish component package setup."

unset PKGNAME VALIDATED_PKGNAME PROJNAME PKGDIR

