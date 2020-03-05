FROM node:13
WORKDIR /api
COPY package.json .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]

COPY . .

