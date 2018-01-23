FROM node:8 as webpack

ADD . .
COPY ./build ./build
RUN npm install
RUN npm run webapp:prod

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=webpack ./build /usr/share/nginx/html


EXPOSE 80

CMD ["nginx" , "-g", "daemon off;"]
