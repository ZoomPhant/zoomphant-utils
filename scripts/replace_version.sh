#!/bin/bash

sed -i "s/workspace:\*/$(cat packages/monitor-react/package.json | jq -r '.version')/g" packages/monitor-react/package.json
