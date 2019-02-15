#!/usr/bin/env bash

# ==============================================================================
# Pull changes from component repos and clone all repos from repolist.txt
# Requires git 1.8.5 or greater to use the -C command.
#
# Accepts arguments for call to clone-repos.sh:
#
# Suppress "run install.sh" message at the end with -q
#   (for install.sh to suppress redundant output)
# Show git output when attempting to clone repos with -v
#   (suppressed by default as git prints an error message when attempting to
#   clone an existing repo)
#
# Usage: ./update-components.sh [-q] [-v]
# ==============================================================================

# Get arguments for ./clone-repos.sh call
clone_repos_args=
while [ "$1" != "" ]; do
    case $1 in
        -v)
            clone_repos_args+="-v "
            ;;
        -q)
            clone_repos_args+="-q "
            ;;
        *)
            ;;
    esac
    shift
done

# Check for existing components
if ls ./wagtail-* 1> /dev/null 2>&1; then
    echo "Pulling changes from component repos..."
    ./git-each.sh pull --rebase
fi

echo "Cloning items from repolist.txt..."
./clone-repos.sh $clone_repos_args


