version: 0.0
os: linux
files:
  - source: /frontend
    destination: /var/www/html
hooks:
  AfterInstall:
    - location: scripts/deploy-frontend.sh
      timeout: 300
