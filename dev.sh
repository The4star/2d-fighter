#!/bin/sh
rm -rf ./lib
mkdir lib
cp -R ./img ./lib/img
honcho start 