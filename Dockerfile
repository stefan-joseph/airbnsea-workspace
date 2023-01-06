FROM node

WORKDIR /airbnb-clone

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN npm install --omit=dev

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/common/dist ./packages/common/dist
# COPY ./packages/server/.env ./packages/server/.env

WORKDIR /airbnb-clone/packages/server

ENV NODE_ENV=production

EXPOSE 4000

CMD [ "node", "dist/src/index.js" ]