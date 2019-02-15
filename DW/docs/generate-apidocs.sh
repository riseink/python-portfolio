#!/usr/bin/env bash

# ==============================================================================
# Generates source docs with sphinx-api. Run in the docker container
#
# Optionally accepts additional arguments to pass to sphinx-apidoc
#
# Usage: docker-compose run web /docs/generate-apidocs.sh [sphinx-apidoc args]
# ==============================================================================

cd /docs/
sphinx-apidoc $@ -eM -o /docs/source/ /app/ /app/src/ /app/website/migrations/

