# set up build environment
FROM node:hydrogen-slim AS build

# build app
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

# entry point
FROM node:hydrogen-slim
WORKDIR /app
COPY --from=build /build/.output .
ENV PORT=5000
EXPOSE 5000

CMD [ "node", "./server/index.mjs" ]