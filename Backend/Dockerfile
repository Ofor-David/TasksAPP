# use the latest alpine version of node
FROM node:alpine

# set current working directory to root
WORKDIR /

# cache package.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files from the current directory to the working directory in the container
COPY . .

# change "8000" to the port your app runs on as specified in your .env
EXPOSE 8000 

# start the app
CMD ["npm", "start"]
# for development, uncomment the line below and comment the lin above
# CMD ["npm", "run", "dev"] 
