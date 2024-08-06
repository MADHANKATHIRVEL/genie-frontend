#!/bin/bash
cd /var/www/html
docker stop frontend || true
docker rm frontend || true
docker run -d -p 3000:3000 --name frontend frontend-image
