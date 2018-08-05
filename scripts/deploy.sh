#!/bin/bash


# Checks if there are any packages
if [ ! -d "packages" ]; then
  echo "No packages to deploy"
  exit
fi

cd packages

packages=$(ls -d */)

# Iterate through each package
for package_route in $packages; do
  # Check if a package has been updated. Only push changed packages
  if [[ $(git status --porcelain) =~ $package_route ]]; then

    package=${package_route::-1}

    # Change into the package
    cd $package

    # Only push packages with necessary config
    if [ -f "Dockerfile" ]; then
      echo "Deploying package: $package"
      # Push image to Docker Hub account
      docker push $DOCKER_USERNAME/$package:$1
    fi

    # Change out
    cd ..
  fi
done