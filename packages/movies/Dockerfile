FROM node:8.11.3

# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/false nupp && \
  apt-get clean

ENV HOME=/home/nupp

COPY package.json $HOME/app/

COPY src/ $HOME/app/src

RUN chown -R nupp:nupp $HOME/* /usr/local/

WORKDIR $HOME/app

RUN yarn

RUN chown -R nupp:nupp $HOME/*

USER nupp

EXPOSE 3000

CMD ["yarn", "start"]