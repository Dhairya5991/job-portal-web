#!/bin/bash
DATE=$(date +%F)
mongodump --uri="$MONGO_URI" --out="./backups/$DATE"
echo "MongoDB backup completed: $DATE"
