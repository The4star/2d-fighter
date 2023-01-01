#!/bin/sh
rm -rf ./lib
mkdir lib
cp -R ./img ./lib/img
tsc
sass src/styles:lib/styles