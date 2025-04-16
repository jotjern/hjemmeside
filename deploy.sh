#!/bin/bash

set -e

git push

sleep 5

while true; do
  db_id=$(gh run list --commit "$(git rev-parse HEAD)" --json databaseId | jq '.[0].databaseId')
  if [ "$db_id" != "null" ]; then
    break
  fi
  echo "Waiting for run to appear..."
  sleep 1
done

gh run watch -i 1 "$db_id" 
