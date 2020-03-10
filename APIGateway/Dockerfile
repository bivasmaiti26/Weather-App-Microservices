FROM node:13
WORKDIR /api
COPY package.json .
RUN npm install
EXPOSE 8080 9090
CMD [ "npm", "run","start" ]

COPY . .
