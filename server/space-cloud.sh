#!/usr/bin/env sh

/bin/sed -i "s|\${DB_USERNAME}|$DB_USERNAME|g" /space-cloud/config.yaml
/bin/sed -i "s|\${DB_PASSWORD}|$DB_PASSWORD|g" /space-cloud/config.yaml

./space-cloud run --config config.yaml