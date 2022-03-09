const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const dfsKeys = req.body.data;
  const options = {
    method: 'POST',
    url: 'https://krivpfvxi0.execute-api.us-west-2.amazonaws.com/dev/getDef',
    data: dfsKeys
  };

  await axios(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
});

module.exports = router;