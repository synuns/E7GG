const express = require("express");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  const url = 'https://e7-optimizer-game-data.s3-accelerate.amazonaws.com/herodata.json?';
  const option = {
    url: url,
    method: "GET",
  };

  request(option,
    (error, response, body) => {
			if(error) throw new Error(error);
      res.send(body);
    }
  );
});

module.exports = router;