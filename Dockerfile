FROM node:18-alpine

COPY ./package* /app
WORKDIR /app
RUN npm install

COPY . /app/src

EXPOSE 3000
CMD npm start