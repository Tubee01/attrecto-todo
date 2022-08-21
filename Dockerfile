### Build Step
# pull the Node.js Docker image
FROM node:18-alpine as builder
# change working directory
WORKDIR /home/node/frontend

# copy the package.json files from local machine to the workdir in container
COPY ./frontend/package*.json ./

# run npm install 
RUN npm ci

# copy the generated modules and all other files to the container
COPY ./frontend .


# build the application
RUN npm run build

FROM nginx:alpine
# copy configuration file to the container
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /home/node/frontend/build .



CMD ["nginx"]

EXPOSE 80
# 443