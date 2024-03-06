FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./
COPY index.html ./

RUN npm ci

COPY . .

CMD ["npm", "start"]