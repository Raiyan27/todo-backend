const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  const dummyData = {
    message: "Welcome to the dummy data route!",
    status: "success",
    data: {
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      tasks: [
        {
          title: "Complete project",
          description: "Finish the project documentation",
          status: "In Progress",
        },
        {
          title: "Buy groceries",
          description: "Get milk, eggs, and bread",
          status: "Pending",
        },
      ],
    },
  };

  res.status(200).json(dummyData);
});

module.exports = router;
