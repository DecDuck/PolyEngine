# set up build environment
FROM node:hydrogen-alpine3.19 AS build

# build app
RUN apk add yarn
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

# entry point
FROM node:hydrogen-alpine3.19
WORKDIR /app
COPY --from=build /build/.output .
ENV PORT=5000
EXPOSE 5000

CMD [ "node", "./server/index.mjs" ]