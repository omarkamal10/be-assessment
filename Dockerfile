FROM node:16.14.0-alpine3.14
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 9000

CMD [ "npm", "run", "docker" ]