FROM node:16.13.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm run build

COPY ./dist ./src

CMD ["node", "src/main.js"]