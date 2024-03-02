# set up build environment
FROM node:lts-alpine AS build

# build app
RUN apk add yarn
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

# entry point
FROM node:lts-alpine
WORKDIR /app
COPY --from=build /build/.output .
ENV PORT=5000
EXPOSE 5000

CMD [ "node", "./server/index.mjs" ]