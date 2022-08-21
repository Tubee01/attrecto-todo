### Build Step
# pull the Node.js Docker image
FROM node:18-alpine as builder

# change working directory
WORKDIR /home/node/backend

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install 
RUN npm ci 
#--silent

# copy the generated modules and all other files to the container
COPY . .

# build the application
RUN npm run build

### Serve Step
# pull the Node.js Docker image
FROM node:18-alpine

# change working directory
WORKDIR /home/node/backend

# copy files from previous step
COPY --from=builder /home/node/backend/node_modules ./node_modules
COPY --from=builder /home/node/backend/dist ./dist

# the command that starts our app
CMD ["node", "dist/main.js"]