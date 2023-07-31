FROM node:18-alpine

WORKDIR /src
COPY ./package* ./

RUN npm install

RUN npm install axios

COPY . .

EXPOSE 3000
CMD npm start