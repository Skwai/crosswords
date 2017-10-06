#!/bin/bash
for f in ./data/*
do
  firebase database:set /$(basename "${f%.*}") "${f}" -y
done
