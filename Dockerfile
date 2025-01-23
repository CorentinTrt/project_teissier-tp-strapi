FROM node:18 AS build
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json  .
COPY pnpm-lock.yaml .

ENV NODE_ENV=production

RUN pnpm install --production --quiet --frozen-lockfile
COPY . .

#needed for files and folder creation by Cloud Run
RUN chmod 777 /usr/src/app/node_modules
RUN chmod 777 /usr/src/app/public/uploads

RUN pnpm run build

EXPOSE 1337
EXPOSE 5432

#changing user
USER 1000

CMD ["pnpm","run", "start"]
