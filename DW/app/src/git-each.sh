#!/usr/bin/env bash

# ==============================================================================
# Iterates through wagtail component subdirectories and executes a git command.
# Requires git 1.8.5 or greater to use the -C command.
#
# Usage: ./git-each.sh <git command>
# ==============================================================================

# Print help message if no arguments are passed
if [[ $# -eq 0 ]]; then
    git --help
    exit 0
fi

# Iterate through each directory with wagtail- prefix
for D in wagtail-*; do
    echo "$D"
    # Execute command from the directory
    git -C $D $@
done

