### Install deps

```bash
npm install
```

### Create Redis container

```bash
docker run --name <your-container-name> -p 6379:6379 -d redis
```

### Start

```bash
npm start

visit: http://localhost:3000/?username=kevinhermawan
# You can change username value with your GitHub username
```
