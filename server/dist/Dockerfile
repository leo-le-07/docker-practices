FROM node:10.16.3-alpine

RUN mkdir /api_app
WORKDIR /api_app
COPY package.json yarn.lock /api_app/
RUN yarn

COPY . .
