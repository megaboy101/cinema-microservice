# cinema-api-mod

Cinema api tutorial modded for TS/CI/kubernetes

So what I want to be able to do, for the CI/CD pipeline anyway, is be able to have each package in my monorepo be tested, built, and deployed on each git commit. Each package is it's own docker container, so each package must have it's own testing and building scripts. Moreover, if a package isn't modified it shouldn't be rebuilt/tested and should just noop instead. The entire pipeline should be configurable from one CI config file and the monorepo root.

PSEUDOCODE:
For each $package...
  if git reports the package has been updated...
    Call the packages test script
    Call the packages build script
    Publish the build image to a registry
  else
    Report that the package has not been changed, and will skip it