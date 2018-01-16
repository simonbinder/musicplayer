#!/bin/bash

# update api and run tests
# cd server && npm install && npm test
#cd ..

# update frontend and compile
#cd src && npm install && webpack
#cd ..
sudo npm install
sudo npm test

# build docker images
docker-compose build
