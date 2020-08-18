
FROM node:10-alpine as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install && mkdir /registrocovid-front && mv ./node_modules ./registrocovid-front

WORKDIR /registrocovid-front

COPY . .

RUN npm run build



# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx:1.16.0-alpine
COPY --from=builder /registrocovid-front/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY Docker/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




