# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev` 

And you'll get access to localhost:3000 - front end - and localhost:5000 - back end.

## To run the app
To get access to the working app, you'll also need to get the environmental variable crewmeister_connection_uri, ask the owner of this repo for it.
After that, you just need to run 'npm install' on both the main folder and the client folder

# Crewmeister coding challenge 

This was made as a deliverable for the Crewmeister coding challenge

## Acceptance Criteria

- I can get a list of absences including the names of the employee (using api.js or api.rb)
- I can generate an iCal file and import it into outlook (maybe use a gem or npm package)
- I can see vacations of my employees as "#{member.name} is on vacation" 
- I can see sickness of my employees as "#{member.name} is sick" 
- (Bonus) I can go to http://localhost:3000 and download the iCal file
- (Bonus) I can go to http://localhost:3000?userId=123 and only receive the absences of the given user
- (Bonus) I can go to http://localhost:3000?startDate=2017-01-01&endDate=2017-02-01 and only receive the absences in the given date range
- (Bonus) Build the first 4 acceptance criteria in the other language (for backend candidates in js and for frontend candidates in ruby)
