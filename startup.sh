#!/usr/bin/env bash

echo "Initialize Environment from Bash"
source ~/.bash_env

echo "Initialize Environment in Project"
export NODE_ENV=production
export APP_PORT=4000

export AWS_DEFAULT_REGION=ap-southeast-2

# Debug Environment
if [[ $DEBUG ]]; then
  export -p
fi

  echo "Starting Server"
  node src/index.js