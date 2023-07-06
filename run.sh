#!/bin/bash

DEST="output_files"

node src.js | jq -s . > $DEST/output.json
cat $DEST/output.json | jq -r '(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv' > $DEST/output.csv

echo "$DEST/output.csv"
head $DEST/output.csv
