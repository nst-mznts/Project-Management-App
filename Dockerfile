FROM node:lts-alpine as builder
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY . .
RUN npm cache clean --force
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

