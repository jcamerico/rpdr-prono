FROM node:16

# Backend
WORKDIR /usr/src/app/server
COPY src/server/package*.json ./
RUN npm install
COPY src/server/. .

# Frontend
WORKDIR /usr/src/app/client
COPY src/client/package*.json ./
RUN npm install
COPY src/client/. .

WORKDIR /usr/src/app/
COPY start.sh .
RUN chmod +x start.sh
CMD /usr/src/app/start.sh