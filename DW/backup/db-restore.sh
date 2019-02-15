#!/usr/bin/env bash

# ==============================================================================
# Restore a backup .sql file
#
# Usage: ./db-restore.sh <backup_file.sql>
# ==============================================================================

if [[ $# -eq 0 ]]; then
    echo "usage: ./db-restore.sh <backup_file.sql>"
    exit
fi
cat "$1" | docker-compose exec -T db mysql -u root --password=password wagtail
