#!/usr/bin/env bash

# ==============================================================================
# Clone each repo for components in repolist.txt
#
# Suppress "run install.sh" message at the end with -q
#   (for install.sh to suppress redundant output)
# Show git output when attempting to clone repos with -v
#   (suppressed by default as git prints an error message when attempting to
#   clone an existing repo)
#
# Usage: ./clone-repos.sh [-q] [-v]
# ==============================================================================

# Parse command line arguments
verbose=0
suppress_new_repo_msg=0
while [ "$1" != "" ]; do
    case $1 in
        -v)
            verbose=1
            ;;
        -q)
            suppress_new_repo_msg=1
            ;;
        *)
            echo "Usage: ./clone-repos.sh [-q] [-v]"
            ;;
    esac
    shift
done


new_repos=0
# Parse each line of repolist.txt
# (See https://stackoverflow.com/a/10929511 for info on the while condition)
while IFS='' read -r line || [[ -n "$line" ]]; do
    # Ignore lines starting with #
    if [[ "$line" != '#'* ]]; then
        # Remove version tag (if present)
        component=$(echo "$line" | cut -f 1 -d '@')
        # build URL
        repo="git+ssh://git@bitbucket.org/sccdigital/${component}.git"
        if [[ $verbose < 1 ]]; then
            git clone "$repo" > /dev/null 2>&1
        else
            git clone "$repo"
        fi
        # If exit status is 0, then $repo was not already cloned
        if [ $? -eq 0 ]; then
            new_repos=1
            echo "Added $repo"
        fi
    fi
done < ./repolist.txt

if [[ $new_repos > 0 ]] && [[ $suppress_new_repo_msg != 1 ]]; then
    echo -e "\nNew packages were added, please run install.sh."
fi

unset new_repos verbose suppress_new_repo_msg

