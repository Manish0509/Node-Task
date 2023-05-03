const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getAllTask = (req, res) => {
  fs.readFile("users.json", function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.end(data);
    }
  });
};

const getTaskById = (req, res) => {
  const userId = req.params.id;
  // Read the existing users from the JSON file
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      let users = JSON.parse(data);

      // Find the user with the given ID
      const user = users.find((user) => user.id === userId);
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    }
  });
};
const addTask = (req, res) => {
  const user = req.body;
  user.id = uuidv4();
  user.createdAt = new Date();
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error(err);
      res.send("An error occurred");
    } else {
      const users = JSON.parse(data); //convert text into a JavaScript object
      users.push(user);
      // Write the updated array back to the JSON file
      fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("An error occurred");
        } else {
          res.send("User added successfully");
        }
      });
    }
  });
};
const updateTask = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  userData.updatedAt = new Date();
  // Read the existing users from the JSON file
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      let users = JSON.parse(data);

      // Find the index of the user with the given ID
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        res.status(404).send("User not found");
      } else {
        // Update the user with the new data
        users[userIndex] = {
          ...users[userIndex],
          ...userData,
          id: userId,
        };

        // Write the updated array back to the JSON file
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("An error occurred");
          } else {
            res.send("User upadted successfully");
          }
        });
      }
    }
  });
};
const deleteTask = (req, res) => {
  const userId = req.params.id;

  // Read the existing users from the JSON file
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred");
    } else {
      let users = JSON.parse(data);
      // Find the index of the user with the given ID
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        res.status(404).send("User not found");
      } else {
        // Remove the user from the array
        users.splice(userIndex, 1);

        // Write the updated array back to the JSON file
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("An error occurred");
          } else {
            res.send("User deleted successfully");
          }
        });
      }
    }
  });
};

module.exports = {
  getAllTask,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
