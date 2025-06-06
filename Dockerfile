ARG NODE_IMAGE=node:20-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
ARG API_URL=${API_URL}
ARG BUCKET_URL=${BUCKET_URL}
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE ${PORT}
CMD [ "dumb-init", "node", "server.js" ]
