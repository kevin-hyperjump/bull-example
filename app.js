const http = require("http");
const Bull = require("bull");
const fetch = require("node-fetch");

const myQueue = new Bull("my-queue", {});

myQueue.process(async ({ id, data }) => {
  console.log(`PROCESSING JOB - id: ${id}, data:`, data);

  return fetch(`https://api.github.com/users/${data.username}`)
    .then((res) => res.json())
    .then((data) => {
      return new Promise((resolve) => {
        return setTimeout(() => {
          return resolve({
            id: data.id,
            name: data.name,
            company: data.company,
          });
        }, 3000);
      });
    });
});

myQueue.on("completed", ({ id }, result) => {
  console.log(`JOB COMPLETED - id: ${id}, result:`, result);
});

http
  .createServer((req, res) => {
    // Prevents twice calls
    if (req.url != "/favicon.ico") {
      myQueue.add({
        username: req.query?.username ?? "kevinhermawan",
      });
    }

    res.write("Hello World!");
    res.end();
  })
  .listen(3000, function () {
    console.log("Server running on: http://localhost:3000");
  });
