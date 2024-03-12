FROM node:alpine
WORKDIR /usr/src/app
COPY package* ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "serve"]
