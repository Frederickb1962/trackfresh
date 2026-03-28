#!/bin/bash
BACKUP_DIR="backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
cp app/page.js "$BACKUP_DIR/page.js.$TIMESTAMP"
echo "Backed up to $BACKUP_DIR/page.js.$TIMESTAMP"
# Keep only the last 7 backups
ls -t "$BACKUP_DIR"/page.js.* 2>/dev/null | tail -n +8 | xargs rm -f --
