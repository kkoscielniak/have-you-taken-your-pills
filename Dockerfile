FROM node:10

WORKDIR /usr/src/app

RUN npm install -g serve

COPY ./build .

EXPOSE 5001

CMD ["serve", "-l", "80", "-s", "."]