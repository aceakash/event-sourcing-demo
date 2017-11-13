# event-sourcing-demo
User management app in TypeScript to try out event sourcing

# Run app locally
```
npm i
npm run compile
npm start
```

# Usage

This is a web app that exposes the following routes.

`POST /users`
Send JSON or x-www-form-url-encoded data with the following properties: fullName, email

Example:
```
curl -X POST http://localhost:6543/users -d "fullName=Akash%20Kurdekar&email=akash.kurdekar@mail.com"
```

`GET /users/:id`
Gets the user for the specified ID

Example:
```
curl http://localhost:6543/users/d35a55e2b45bde50edce4abdb6126e64
```
