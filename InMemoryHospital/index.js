const express = require("express");
const app = express();

var users = [
  {
    name: "harry",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numOfKidneys = johnKidneys.length;
  let numOfHealthyKidneys = 0;
  for (i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numOfHealthyKidneys += 1;
    }
  }
  const numOfUnhealthyKidneys = numOfKidneys - numOfHealthyKidneys;
  res.json({
    numOfKidneys,
    numOfHealthyKidneys,
    numOfUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "done!",
  });
});

app.put("/", (req, res) => {
  if (isThereUnhealthy()) {
    for (i = 0; i < users[0].kidneys.length; i++) {
      users[0].kidneys[i].healthy = true;
    }
    res.json({});
  } else {
    res.status(411).json({
      msg: "You have only healthy kidneys",
    });
  }
});

app.delete("/", (req, res) => {
  if (isThereUnhealthy()) {
    const newKidneys = [];
    for (i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.json({});
  } else {
    res.status(411).json({
      msg: "you have 0 unhealthy kidneys",
    });
  }
});

function isThereUnhealthy() {
  let isUnhealthy = false;
  for (i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      isUnhealthy = true;
    }
  }
  return isUnhealthy;
}

app.listen(3000);
