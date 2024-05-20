FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "vite.config.js", "npm-shrinkwrap.json*", "./"]

# RUN npm install --production --silent
RUN npm install

RUN npm install -g vite

COPY . .

EXPOSE 5173

CMD ["npm", "start", "--host"]
