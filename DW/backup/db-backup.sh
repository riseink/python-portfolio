#!/usr/bin/env bash

# ==============================================================================
# Gets an SQL dump of the current database state and outputs it to an .sql file
# with the date/time of backup as its filename
#
# Usage: ./db-backup.sh
# ==============================================================================

docker-compose exec -T db /usr/bin/mysqldump -u root --password=password wagtail > "$(date +'%Y%m%d_%H%M').sql"

