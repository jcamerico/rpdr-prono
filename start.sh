#!/bin/bash

cd server
nohup npm start &
cd ../client
npm start

