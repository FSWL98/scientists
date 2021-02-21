#!/bin/bash

name=front
user=user
build=$(pwd)/build
build_container_name=front_build

rm -rf build || true
mkdir -p build

docker image remove front_build || true
docker image remove $name || true

docker volume remove front_build || true
docker volume create --driver local \
	--opt type=none \
	--opt device=$build \
	--opt o=bind front_build

docker build -t $build_container_name -f Dockerfile_create_build .
docker run -d --rm --name front_build -v front_build:/app/build $build_container_name

docker stop $name || true
docker rm $name || true 

docker build -t $name -f Dockerfile .

docker run -d --name $name -p 5000:80 $name

chown -R $user: $build
