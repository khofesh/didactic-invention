# build environment
FROM node:14.18-alpine as react-build

WORKDIR /app
COPY . ./
ARG REACT_APP_OMDB_KEY
RUN echo REACT_APP_OMDB_KEY=${REACT_APP_OMDB_KEY} > .env.local
RUN cat .env.local
RUN yarn
RUN yarn build

# server environment
FROM nginx:alpine
COPY ./configs/nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]