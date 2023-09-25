FROM node:18-alpine
RUN apk update 
WORKDIR /bane_invoice_fr
COPY package.json /bane_invoice_fr
COPY . .
RUN npm
RUN npm build