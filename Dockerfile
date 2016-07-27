FROM node:4-onbuild

COPY . /root/ping

RUN cd /root/ping && npm install

EXPOSE 8000
