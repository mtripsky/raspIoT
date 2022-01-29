# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY *.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

# add app
#COPY ./yarn.lock ./
COPY ./src ./src
COPY ./public ./public

# start app
CMD ["npm", "start"]