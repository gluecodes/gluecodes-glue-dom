FROM node:11

ARG SSH_KEY
RUN echo "$SSH_KEY"
RUN mkdir /root/.ssh && chmod 700 /root/.ssh
RUN echo "$SSH_KEY" > /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa
RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN apt-get update && apt-get install -yq apt-transport-https

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -yq yarn

WORKDIR /src/gluecodes-glue-dom
ADD . /src/gluecodes-glue-dom
RUN rm -rf node_modules
RUN yarn install
RUN npm run build
