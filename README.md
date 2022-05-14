# RuPaul's Drag Race Pronostic

I have written this nodejs webapp to automate a forecast between friends for RuPaul's Drag Race results.

Views were first written with EJS, with custom CSS + Bootstrap. 
I have migrated it to ReactJS.

Forecasts are saved in a Mongoose DB. Results are updated directly in it, weekly. One day I will create an admin page to do it.

Authentication/authorization was implemented using Passport.js and Express session. I have removed it when I migrated it to React, but I need to add it back.

Some unit tests were written with Jest.

Deployment is done with a Docker container on Heroku, with a slight DNS configuration to use a custom domain.