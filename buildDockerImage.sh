#!/bin/bash
VERSION="0.1.2"
ARCH="arm32v7"
APP="iot-viewer"
docker buildx build -f ./dockerfile -t $APP:$VERSION . --load
docker tag $APP:$VERSION mtripsky/$APP:$VERSION
docker push mtripsky/$APP:$VERSION