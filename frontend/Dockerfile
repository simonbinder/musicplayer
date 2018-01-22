FROM node:8 as webpack

ADD . .
COPY ./build ./build
RUN npm install
RUN npm run webapp:prod

FROM nginx:latest

COPY --from=webpack ./build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx" , "-g", "daemon off;"]
