# Express TypeScript MVC

This is a simple Express.js application set up using TypeScript following the MVC design pattern.




## Getting Started

1. Use postgres 12.2 to create a database
2. execute the table.sql file to create the tables
3. Change the .env file with your database credentials
4. Install dependencies: `npm install`
5. Run the application: `tsc && node dist/app.js`
6. Open your browser and go to `http://localhost:3000`

###Insert a user

1. Open your browser and go to `http://localhost:3000/api/users`
2. Use the POST method to insert a user
3. Insert a user with the following body:

```json
{
    {
    "email": "philippe@gmail.com",
    "firstName": "Philppe",
    "lastName": "Hidayat",
    "celebrations": [
        {
            "date": "2023-11-23",
            "celebrationType": "Birthday"
        }
    ]
}
}
``` 

###Delete a user

1. Open your browser and go to `http://localhost:3000/api/users/1`
2. Use the DELETE method to delete the user


###Notes

1. The timezone is based on the user's IP address.
2. Retry sending message can be done by tracking the message status and resend if needed. Ideally by using a queue system.
3. cron job can be done by using a queue system.