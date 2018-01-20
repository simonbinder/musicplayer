FROM node:8

ADD . .

RUN npm install
cmd npm run webapp:prod

FROM nginx:latest

COPY ./build /usr/share/nginx/html

cmd ["nginx"]
