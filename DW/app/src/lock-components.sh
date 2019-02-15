#!/usr/bin/env bash

# ==============================================================================
# Create a new repolist.txt with package version locks for the nearest tag
#
# By default, a backup of the current repolist.txt will be created as a new file
# repolist.txt.BAK.<timestamp>. To skip the backup and just overwrite
# repolist.txt, use the --no-backup (or -b) flag
#
# If the --reset (or -r) flag is specified, the new repolist.txt will just
# contain the components without specifying a version to lock it to in
# production
#
# If the --show-legacy (or -l) flag is specified, the contents of
# .legacyrepos.txt, which lists commented out legacy components, will be
# appended to the new repolist.txt. This step will be skipped of
# .legacyrepos.txt does not exist
#
# Usage: ./lock-components.sh [--no-backup] [--reset] [--show-legacy]
# ==============================================================================

# Parse command line arguments
BACKUP_REPOLIST=1
RESET_REPOLIST=0
SHOW_LEGACY=0
while [ "$1" != "" ]; do
    case $1 in
        -n|--no-backup)
            BACKUP_REPOLIST=0
            ;;
        -r|--reset)
            RESET_REPOLIST=1
            ;;
        -l|--show-legacy)
            SHOW_LEGACY=1
            ;;
        -h|--help)
            echo "usage: ./lock-components.sh [--no-backup] [--reset] [--show-legacy]"
            exit
            ;;
        *)
            ;;
    esac
    shift
done


# Backup repolist.txt (unless --no-backup is passed)
if [ -f ./repolist.txt ] && [ "$BACKUP_REPOLIST" -gt 0 ]; then
    echo "Backing up existing repolist.txt..."
    # Append timestamp in case backup already exists
    timestamp="$(date +'%s')"
    backup_file="repolist.txt.BAK.$timestamp"
    mv repolist.txt "$backup_file"
    echo "Backup created ($backup_file)."
fi

# Create new repolist.txt
echo "Creating new repolist.txt..."
echo "# Syntax: <component>[@<tag>]" > repolist.txt

# Iterate thru component directories
for D in wagtail-*; do
    version="$(git -C $D describe --abbrev=0)"
    line="$D"
    # leave out the @$version if no tags were found (or if --reset is specified)
    if [ -n "$version" ] && [ "$RESET_REPOLIST" -lt 1 ]; then
        line="$line@$version"
    fi
    echo "$line" >> repolist.txt
    # Feedback
    echo "$line"
done

# Include commented out legacy components if --show-legacy is specified
if [ "$SHOW_LEGACY" -gt 0 ] && [ -f ./.legacyrepos.txt ]; then
    echo "Appending legacy components (commented out)..."
    echo -ne "\n\n" >> repolist.txt
    cat ./.legacyrepos.txt >> repolist.txt
fi

# Add a new line to the end of file
echo -ne "\n" >> repolist.txt

echo "repolist.txt created."

