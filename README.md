# KReservations Tech Assessment

## In order to serve the application

Execute the following commands: 
- `cd mock-api`
- `docker build --no-cache -t kres-be-alvaro:LATEST .`
- `cd ..`
- `docker build --no-cache -t kres-fe-alvaro:LATEST .`
- `docker run -d -p 3000:3000 kres-be-alvaro:LATEST`
- `docker run -d -p 8080:80 kres-fe-alvaro:LATEST`


you can see the **application up and running at localhost:8080**

**Please take into account that no designs were provided so I have not dedicated effort to SCSS. I have added only tests in the screen with the form (I couldn't spend more time), since it is the one with more logic and it can show how I can perform tests in the FE.**
**I have also added extra logic that is not specified in the requirements in order to have the button to submit enabled, and clearing some fields that depend on others.**
