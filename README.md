# RuPaul's Drag Race Pronostic

I have written this nodejs webapp to automate a forecast between friends for RuPaul's Drag Race results.

Views were written with EJS, with custom CSS + Bootstrap. I want to migrate it to React whenever I have some time :)

Forecasts are saved in a Mongoose DB. Results are updated directly in it, weekly.

Autentication/authorization was implemented using Passport.js and Express session.

Some unit tests were written with Jest.

Deployment is done with Heroku, with a slight DNS configuration to use a custom domain.