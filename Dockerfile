FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./frontend /usr/local/app/

RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/apps/kres /usr/share/nginx/html

EXPOSE 80
