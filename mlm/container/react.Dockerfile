FROM node:14

RUN apt-get update && apt-get install build-essential -y

WORKDIR /var/www/html/mlm

COPY ./package*.json .

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .
