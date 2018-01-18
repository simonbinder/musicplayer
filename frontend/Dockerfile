FROM node:8

ADD . .

RUN npm install
cmd npm run webapp:prod

FROM nginx:latest

EXPOSE 80

COPY ./build /var/www

cmd ["nginx"]
