# Basicgram
## Development
- Need local version of redis + mongo
- Run redis-server and redis-cli from wherever your redis installation is
- Run mongo with `$ mongod --dbpath=...`
- Run all servers manually, or simply run `pm2 start process.config.js`
- Start React development server with `npm start`.
- Please *tab* and *comment* or else you will just piss everyone off, unless it's a last minute commit.

## Dockerizing
Build all images and push to dockerhub
- If you do not have a dockerhub account, create one.
- Login to docker with `$ docker login`
- In package.json and in devops/basicgram.Dockerfile, replace the placeholder `someonesdockerhubid` with your own docker hub id (on the ones you intend on pushing to dockerhub at least).
- Run `$ npm run build-all-docker` to build all docker images, or choose the one you plan on pushing up to dockerhub.
- Run `$ npm run deploy`.

## Communication
Can someone put the excel sheet of the features here?

## Architecture
Someone put the image of the architecture here for reference?