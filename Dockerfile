FROM node:18-alpine

COPY ./package* /src
WORKDIR /src
RUN npm install

COPY . /src

EXPOSE 3000
CMD npm start