#!/usr/bin/env bash

# ==============================================================================
# (FOR USE IN DOCKERFILE)
# Install packages in /app/src/
#
# Accepts a 1 or a 0 as an optional positional argument. If set to 1, packages
# are installed for production using private_requirements.txt. If set to 0,
# packages are installed for develop by iterating through directories in
# /app/src/. Defaults to 0
#
# Usage: ./install-components.sh [ENV_PROD]
# ==============================================================================

INSTALL_PROD=0
if [[ "$#" > 0 ]]; then
    INSTALL_PROD="$1"
fi

current_dir="$(pwd)"

if [[ "$INSTALL_PROD" < 1 ]]; then
    cd /app/src
    # Iterate through each directory and install any with a setup.py file
    for D in */; do
        if [ -f "${D}setup.py" ]; then
            cd /usr/local/lib/python3.6/site-packages
            python "/app/src/${D}setup.py" develop --no-deps
            cd /app/src
        fi
    done
else
    cd /app
    # Remove package files before attempting to install
    # private requirements (to avoid errors)
    rm -rf /app/src/wagtail-*
    # Create requirements file
    touch /app/private_requirements.txt
    # Build urls based on repolist.txt
    while IFS='' read -r line || [[ -n "$line" ]]; do
        # Ignore lines starting with # and empty lines
        if [[ "$line" != '#'* ]] && [[ "$line" != "" ]]; then
            component=$(echo "$line" | cut -f 1 -d '@')
            tag=
            # get version tag if specified
            if [[ "$line" == *'@'* ]]; then
                tag="@$(echo "$line" | cut -f 2 -d '@')"
            fi
            # build URL and add it to private_requirements.txt
            echo "-e git+ssh://git@bitbucket.org/sccdigital/${component}.git${tag}#egg=${component}" >> /app/private_requirements.txt
        fi
    done < /app/src/repolist.txt

    pip install --no-deps -r /app/private_requirements.txt
fi

cd $current_dir
unset INSTALL_PROD current_dir

