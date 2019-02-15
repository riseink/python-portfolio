#!/usr/bin/env bash

# ==============================================================================
# cd into /docs/ and run make. Run in the docker container
#
# Accepts Makefile arguments
#
# Usage: docker-compose run web /docs/make.sh [make args]
# ==============================================================================

cd /docs/
make $@

