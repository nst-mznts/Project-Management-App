FROM node:22-alpine3.19
RUN mkdir -p /opt/mgt_app
WORKDIR /opt/mgt_app
COPY public/ src/ index.html package-lock.json package.json vite.config.js ./
RUN npm install
ENTRYPOINT ["npm","run"]
