# Getting Started
- Place Content Key API from Ghost console into .env folder as 'CONTENT_KEY'
- Returns list of json objects
- Use jq to create an array of json objects: `node src.js | jq -s . > output.json`
- Then create a CSV file: `cat output.json | jq -r '(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv' > output.csv`
