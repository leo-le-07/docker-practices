FROM node:10.16.3-alpine

RUN mkdir /web_app
WORKDIR /web_app
COPY package.json yarn.lock /web_app/
RUN yarn

COPY . .
