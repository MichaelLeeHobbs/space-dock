# Todo App

This is a full stack app based on the sample [space-cloud/todo-app](https://github.com/spaceuptech/todo-app). It demonstrates the use of [space-cloud](https://github.com/spaceuptech/space-cloud) and [space-api](https://github.com/spaceuptech/space-api-js) using Docker, MongoDB, and HAProxy.

## Requirements on Space Cloud

- Docker Compose

## Requirements on your PC

- Clone this repo
- Install Docker Compose

### To Start the Stack
```bash
cd space-dock/web
yarn install
cd ..
docker-compose up
```

### Use the Stack
1. Open a browser window to http://localhost/ and create an account
2. Open another browser window to http://localhost/ and login
3. Optionally: Open a browser to http://localhost/haproxy-stats and login with user: admin password: scAdmin

### Todo's
- Comment Code
- Add yarn command to start/stop the app/stack and/or individual services
- Attach Files to todo notes
- Add some demo FAAS