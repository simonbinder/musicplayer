FROM node:8

ADD . .

RUN npm install
RUN npm run webapp:prod

FROM nginx:latest

COPY ./build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx" , "-g", "daemon off;"]
