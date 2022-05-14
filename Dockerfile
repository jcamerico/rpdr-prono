FROM node:16

# Copy backend
WORKDIR /usr/src/app/server
COPY src/server/package*.json ./
RUN npm install
COPY src/server/. .
RUN mkdir views

# Build frontend and copy static files
WORKDIR /usr/src/app/client
COPY src/client/package*.json ./
RUN npm install
COPY src/client/. .
RUN npm run build
RUN cp -r build/* ../server/views

WORKDIR /usr/src/app/server
CMD ["npm", "start"]