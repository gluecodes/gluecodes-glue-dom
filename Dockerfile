FROM node:11

WORKDIR /src/gluecodes-glue-dom
ADD . /src/gluecodes-glue-dom
RUN yarn install
