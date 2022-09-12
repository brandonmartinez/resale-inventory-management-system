# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY postinstall.js ./
RUN npm install
RUN npm install react-scripts -g

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]