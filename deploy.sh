#!/bin/bash

set -e

while true; do
  db_id=$(gh run list --commit "$(git rev-parse HEAD)" --json databaseId | jq '.[0].databaseId')
  if [ "$db_id" != "null" ]; then
    break
  fi
  echo "Waiting for run to appear..."
  sleep 2
done

gh run watch "$db_id" --exit-status
