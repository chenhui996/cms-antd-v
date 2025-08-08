docker run --rm \
-e JEKNINS_BUILD_VERSION="${JEKNINS_BUILD_VERSION}" \
-e JEKNINS_DOCKER="1" \
--add-host=npm.comstar:172.19.113.47 \
-v ${CURRENT_DIR}:/project \
-v ~/web-build-cache:/web-build-cache \
--user 0 \
harbor.comstar:9980/cnp/comstar-node:v20.10.1