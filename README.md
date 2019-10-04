# REST_Excercise

A simple REST application I wrote as an excercise. 

# Installation

Firstly install dependencies:
>`npm i`

Start server:
>`npm start`

Start scraper:
>`npm run scrape`

Run tests:
>`npm test`

# Perform requests to `Reqres.in`

Reqres.in is a simple RESTful testing API with some fake data and free access.

Firstly, use `npm start` to start server on `localhost:3000`

This application is a wrapper API for Reqres.in and performs these requests:
- Get user by ID: `GET http://localhost:3000/api/user/1`
    - Requests Reqres.in and returns data about the specified user.
- Get user avatar: `GET http://localhost:3000/api/user/1/avatar`
    - Requests Reqres.in, formats image URL into `Base64` format and returns it.
    - Also saves this image in the filesystem under `~/avatars/userID_avatar.txt`. Next time this request is performed, it will return the image from the filesystem instead of requesting the Reqres.in API.
- Delete user avatar: `Delete http://localhost:3000/api/user/1/avatar`
    - Deletes avatar image from the filesystem.

# Perform scraping operations to Reqres.in

Firstly, use `npm run scrape` to begin the cron job.

This operation begins a cron jon, which, every 5 seconds will query Reqres.in to get **one page from users list**, and store each user to a `.json` file in the filesystem under `~/users/users.json`.

In the terminal you are notified which page is being updated.