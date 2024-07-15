FROM node:22-bullseye

WORKDIR /app

COPY client client
COPY server server

WORKDIR /app/client
COPY package*.json ./
RUN npm install
RUN npm run build

WORKDIR /app/server
COPY package*.json ./
RUN npm install
RUN npm install ts-node

RUN mkdir -p /app/server/public
RUN cp -r /app/client/dist/* /app/server/public/

EXPOSE 8080

CMD ["npx", "ts-node", "index.ts"]
