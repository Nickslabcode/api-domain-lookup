const cdnCheckHandler = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).send('Domain query parameter is required!');
  }

  const response = await fetch(`https://${domain}`);
  const headers = response.headers;

  // SiteGround CDN check
  res.send(headers);

  // TODO add more CDN header checks: https://chatgpt.com/c/6748a119-9d58-800c-aab9-75d4ae1d1667
};

export default cdnCheckHandler;
