#! /bin/bash
yarn build:server
flyctl deploy


# heroku container:push web --app tranquil-coast-72686
# heroku container:release web --app tranquil-coast-72686
# heroku open --app tranquil-coast-72686
# docker build -t airbnb-clone:latest .
# docker push airbnb-clone:latest
