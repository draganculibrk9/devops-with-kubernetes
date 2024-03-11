FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./
COPY ./views/index.pug ./views/

RUN npm ci

COPY . .

CMD ["npm", "start"]