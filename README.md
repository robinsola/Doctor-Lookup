# Doctor Lookup
##### Find doctors in Portland, using BetterDoctor API, April 2018, Robin Sola
## Description
With this application you may submit a form with what symptoms you currently have, such as high fever or headache. After submitting the form a list of doctors in the Portland area will be displayed, with doctor name, address, phone number, website, and if they are accepting new patients at the moment.
## Specs
|behavior|input|output|
|--------|-----|------|
|get user input of symptom|high fever|high fever|
|alert if no doctors match symptom|toothache|no docs, try another symptom|
|display list from body.data[i] for symptom/doctor matches|high fever|name,address,phone,website,accepting patients|
|return yes or no if accepting new patients|accepting new patients|yes|
|set undefined to return "none"|website|undefined = "none"|

## Installation
* Clone project folder in terminal: `$ git clone` repository
* In terminal, run `$ npm install` in project home directory
* Sign up for personal api key with BetterDoctor API
* Within the url, replace `${process.env.exports.apiKey}` with your personal api key
* In terminal, run `$ npm run start` to view in browser

## Known Bugs
Each symptom search will append after the previous one, instead of starting a new search.
## Contact
Contact me through github with comments/questions.
## Technologies Used
* HTML
* CSS/BOOTSTRAP
* JavaScript/JQUERY
* npm and webpack

### License
Copyright (c) 2018 **_Robin Sola_**
