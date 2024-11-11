#!/bin/bash

sed -i "s/workspace:[\^\*]/$(cat packages/monitor/package.json | jq -r '.version')/g" "packages/monitor-react/package.json"
sed -i "s/workspace:[\^\*]/$(cat packages/monitor/package.json | jq -r '.version')/g" "packages/monitor-sdk/package.json"
