FROM node:20-alpine as base

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
EXPOSE 3005

FROM base AS dev
RUN npm install -g nodemon
COPY . .
CMD ["sh", "-c", "/wait && npm run dev"]


## Launch the wait tool and then your application
FROM base AS prod
COPY . .
CMD ["sh", "-c", "/wait && npm start"]
