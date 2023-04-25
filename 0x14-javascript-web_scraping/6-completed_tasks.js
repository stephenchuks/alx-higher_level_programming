#!/usr/bin/node

const request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  const tasks = JSON.parse(body);
  const completedByUser = {};

  for (const task of tasks) {
    if (task.completed) {
      const userId = task.userId;
      completedByUser[userId] = (completedByUser[userId] || 0) + 1;
    }
  }

  console.log(completedByUser);
});
