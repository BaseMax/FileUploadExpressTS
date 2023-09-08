# BUILD FOR LOCAL DEVELOPMENT

FROM node:18-alpine3.17 As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

#RUN npm run prisma:generate

USER node


# BUILD FOR PRODUCTION

FROM node:18-alpine3.17 As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node


# PRODUCTION

FROM node:18-alpine3.17 As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# start the server
CMD [ "node", "dist/main.js" ]
