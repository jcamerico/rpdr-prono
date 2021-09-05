# RuPaul's Drag Race Pronostic

I have written this nodejs webapp to automate a forecast between friends for RuPaul's Drag Race All Star 6 results.

Views were written with EJS, with custom CSS + Bootstrap.

Forecasts are saved in a Mongoose DB. Results are updated directly in it, weekly.

Authorization was implemented using Passport.js and Express session.

Unit tests are written with Jest.

Deployment is done with Heroku, with a slight DNS configuration to use a custom domain.