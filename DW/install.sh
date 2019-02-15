#!/usr/bin/env bash

# ==============================================================================
# Build the docker image
#
# If the --prod (or -p) flag is used, the image will be built for production
# instead of dev
#
# Optionally accepts additional arguments to pass to docker-compose build
# (e.g. --no-cache)
#
# Usage: ./install.sh [--prod] [<docker-compose build options>]
# ==============================================================================

# ----------------------------------------------------------------
# Parse arguments
# ----------------------------------------------------------------
ENV_PROD=0
BUILD_ARGS=
while [ "$1" != "" ]; do
    case $1 in
        -p|--prod)
            ENV_PROD=1
            ;;
        -h|--help)
            echo "usage: ./install.sh [--prod] [<docker-compose build options>]"
            exit
            ;;
        *)
            BUILD_ARGS="$BUILD_ARGS $1"
            ;;
    esac
    shift
done

# ----------------------------------------------------------------
# Build Docker Containers
# ----------------------------------------------------------------
if [[ $ENV_PROD < 1 ]]; then
    # Dev Environment
    current_dir="$(pwd)"
    # Clone all of the repos into the src/ directory (and pull changes for any existing)
    cd ./app/src/
    ./update-components.sh -q
    # Get the package directories in src/ to use as the PYTHONPATH environment variable
    src_path="/app/src"
    for D in */; do
        src_path="$src_path:/app/src/${D}"
    done
    cd $current_dir

    docker-compose build \
        --build-arg PYTHONPATH="${src_path}" \
        $BUILD_ARGS

    unset src_path current_dir
else
    # Production Environment
    docker-compose -f docker-compose-production.yml build $BUILD_ARGS
fi

unset ENV_PROD

