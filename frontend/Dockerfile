### Build Step
# pull the Node.js Docker image
FROM node:18-alpine as builder

# change working directory
WORKDIR /home/node/frontend
# copy the package.json files from local machine to the workdir in container
COPY package*.json ./
# run npm install 
RUN npm ci
# copy the generated modules and all other files to the container
COPY . .

# build the application
RUN npm run build


