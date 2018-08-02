#!/bin/bash

# Checks if there are any packages
if [ -z $(ls -A ../packages) ]; then
  echo "No packages to build"
  exit
fi