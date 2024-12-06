import { requestHeaders } from "../common/requestHeaders.js";

const wpCheckHandler = async (req, res) => {
  const domain = req.query.domain;
  console.log(domain);
  if (!domain) {
    res.status(400).send("Domain query parameter is required!");
  }

  const headers = requestHeaders(domain);

  try {
    // wp-login.php
    const wpLoginResponse = await fetch(`https://${domain}/wp-login.php`, {
      headers,
    });

    if (wpLoginResponse.ok) {
      const data = await wpLoginResponse.text();
      const answer = data.includes("wordpress");
      if (answer) {
        return res
          .status(200)
          .json({ wordpressInstalled: true, method: "wp-login" });
      }
    }

    // readme
    const readmeResponse = await fetch(`https://${domain}/readme.html`, {
      headers,
    });

    if (readmeResponse.ok) {
      const data = await readmeResponse.text();
      console.log(data);
      const answer = data.includes("wordpress");
      if (answer) {
        return res
          .status(200)
          .json({ wordpressInstalled: true, method: "readme" });
      }
    }

    // wp-json
    const wpJsonResponse = await fetch(`https://${domain}/wp-json`, {
      headers,
    });

    if (wpJsonResponse.ok) {
      const data = await wpJsonResponse.text();
      const answer = data.includes("wordpress");
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
