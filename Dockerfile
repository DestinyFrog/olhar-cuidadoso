# syntax=docker/dockerfile:1
FROM node:20.13.1

WORKDIR /

ENV SERVER_PORT=3000
ENV DATABASE_URL="mysql://root:Fr4mboesa(com)@localhost:3306/olhar_cuidadoso?schema=public"

RUN apk add --no-cache gcc musl-dev linux-headers

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

EXPOSE 3000

COPY . .
CMD ["npm", "run", "start"]