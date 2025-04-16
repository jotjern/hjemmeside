#!/bin/bash

set -e

git push

echo "Waiting for the GitHub Action to start..."

sleep 3

while true; do
  db_id=$(gh run list --commit "$(git rev-parse HEAD)" --json databaseId | jq '.[0].databaseId')
  if [ "$db_id" != "null" ]; then
    break
  fi
  echo "Still waiting for GitHub Action to start..."
  sleep 1
done

gh run watch -i 0 "$db_id" 
