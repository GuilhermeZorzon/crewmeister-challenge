# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev` 

And you'll run both the localhost:3000 - front end - and localhost:5000 - back end.

## To run the app
To get access to the working app, you'll also need to get the environmental variable crewmeister_mongo_connection_uri, ask the owner of this repo for it.
After that, you just need to run 'npm install' on both the main folder and the client folder

## Backend routes
There are 3 backend routes on this app
 - /api/health: health check, returns a simple json saying { 'status': 'health check ok' } to see if the server is working
 - /api/members: allows you to find, create and delete a member from the database, api/members/all finds all the members
 - /api/absences: it is a simple get to find the absences crossed with the members data, which allows to retrieve the user names

## api/absences queries
You can have up to 2 filters in the backend query - both presented as a date range picker and a multi selector in the front-end.
 - The first filter is date, which goes as startDate and endDate on the query. Retrieves all absences with db.startDate or db.endDate between the specified dates
e.g: http://localhost5000/api/absences?startDate=2017-01-01&endDate=2017-02-02
 - The other filter is userId, which is treated as an array. It retrieves all absences for a specific user.
e.g: http://localhost5000/api/absences?userIds[0]=644&userIds[1]=5293

Both filters can be used alone or together, and if no filter is sent by the url query, the api call retrieves all of the absences data. 

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
