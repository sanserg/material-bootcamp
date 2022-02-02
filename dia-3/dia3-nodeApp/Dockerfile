FROM node:14
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies

COPY . .
RUN npm install
EXPOSE 6005
CMD [ "node", "app.js" ]