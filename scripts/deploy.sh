#!/bin/bash

# Checks if there are any packages
if [ -d "$packages" ]; then
  echo "No packages to build"
  exit
fi