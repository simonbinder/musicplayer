#!/bin/bash

# update api and run tests
cd api && npm install && npm test
cd ..

# update frontend and compile
cd frontend && npm install && webpack
cd ..

# build docker images
docker-compose build
