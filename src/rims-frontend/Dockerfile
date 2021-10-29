##################################################################
# Stage 0: Set the Base Primary Image of the App
##################################################################
FROM node:14-alpine AS base

# Install prerequisites
RUN npm install -g http-server

# Create App directory
WORKDIR /app

COPY env.sh .
COPY server.sh .

EXPOSE 80
EXPOSE 443

##################################################################
# Stage 1: Build the Node App
##################################################################
FROM base as publish

# Update NPM to latest and replace the global version
RUN npm install npm@latest
RUN rm -rf /usr/local/lib/node_modules/npm
RUN mv node_modules/npm /usr/local/lib/node_modules/npm

# Copy package files and npm install
COPY ./package*.json ./
RUN npm install

# Copy Remaining Files and Run the build command
COPY ./ ./
RUN npm run build

##################################################################
# Stage 3: Copy Into a Clean Runtime Image
##################################################################
FROM base AS final

# Copy artifacts from the previous stage into this stage
COPY --from=publish /app/build ./

# Setting the executable that will run in the lifetime of this container
ENTRYPOINT ["/app/server.sh"]