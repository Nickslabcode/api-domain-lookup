import axios from "axios";

const wpCheckHandler = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    res.status(400).send("Domain query parameter is required!");
  }

  try {
    // wp-login.php

    const wpLoginResponse = await axios.get(`https://${domain}/wp-login.php`, {
      validateStatus: false,
    });

    if (wpLoginResponse.status === 200) {
      const answer = wpLoginResponse.data.includes("wordpress");
      if (answer) {
        return res
          .status(200)
          .json({ wordpressInstalled: true, method: "wp-login" });
      }
    }

    // readme.html check
    const readmeResponse = await axios.get(`https://${domain}/readme.html`, {
      validateStatus: false,
    });

    if (readmeResponse.status === 200) {
      const answer = readmeResponse.data.includes("wordpress");
      if (answer) {
        return res
          .status(200)
          .json({ wordpressInstalled: true, method: "readme" });
      }
    }

    // wp-json check
    const wpJsonResponse = await axios.get(`https://${domain}/wp-json`, {
      validateStatus: false,
    });

    if (wpJsonResponse.status === 200) {
      const answer = wpJsonResponse.data.includes("wordpress");
      if (answer) {
        return res
          .status(200)
          .json({ wordpressInstalled: true, method: "wp-json" });
      }
    }
    res.status(200).json({ wordpressInstalled: false });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error. Please try again later");
  }
};

export default wpCheckHandler;
