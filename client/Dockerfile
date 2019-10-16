FROM node:10.16.3-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

COPY . .
