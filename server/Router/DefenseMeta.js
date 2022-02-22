const express = require("express");
const request = require("request");
const router = express.Router();

router.post("/", (req, res) => {
  const url = 'https://krivpfvxi0.execute-api.us-west-2.amazonaws.com/dev/getMeta';
  const option = {
    url: url,
    dataType: "text",
    method: "POST",
  };

  request(option,
    (error, response, body) => {
			if(error) throw new Error(error);
      const json = JSON.parse(body);
      res.send(json);
    }
  );
});

module.exports = router;