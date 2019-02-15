#!/usr/bin/env bash

# TODO: update comment
# ==============================================================================
# (FOR USE IN DOCKERFILE)
# Install python/node packages
#
# Accepts a 1 or a 0 as an optional positional argument. If set to 1, only the
# necessary packages for running the site are installed. If set to 0,
# additional packages will be installed for the dev environment (e.g. sphinx
# for generating code documentation). Defaults to 0
#
# Usage: ./install-requirements.sh [ENV_PROD]
# ==============================================================================

INSTALL_PROD=0
if [[ "$#" > 0 ]]; then
    INSTALL_PROD="$1"
fi

# Install global requirements
pip install -r /app/requirements.txt
npm i npm@latest -g && npm install /app/

# Optionally install dev requirements
if [[ "$INSTALL_PROD" < 1 ]]; then
    pip install -r /app/requirements-dev.txt
fi

unset INSTALL_PROD

