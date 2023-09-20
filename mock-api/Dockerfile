FROM node:latest as build

RUN npm install -g json-server 

COPY ./mock-api.json /usr/local/

EXPOSE 3000

CMD ["json-server", "-H", "0.0.0.0", "/usr/local/mock-api.json"]


