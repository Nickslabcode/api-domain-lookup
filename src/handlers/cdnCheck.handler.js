const cdnCheckHandler = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).send("Domain query parameter is required!");
  }

  try {
    const response = await fetch(`https://${domain}`);

    const getHeader = (headerName) => response.headers.get(headerName);
    const cdnHeadersObject = {};

    switch (true) {
      case !!getHeader("x-sg-cdn"):
        cdnHeadersObject.siteGround = true;

      case !!getHeader("cf-cache-status"):
        cdnHeadersObject.cloudFlare = true;

      case !!getHeader("x-bunny-cache"):
        cdnHeadersObject.bunny = true;

      case getHeader("x-cache")?.includes("HIT from cloudFront"):
        cdnHeadersObject.cloudFront = true;

      case !!getHeader("x-akamai-transformed"):
        cdnHeadersObject.akamai = true;

      case !!getHeader("x-sp-cache-status"):
        cdnHeadersObject.stackPath = true;

      case !!getHeader("x-azure-ref"):
        cdnHeadersObject.azure = true;

      default:
        break;
    }

    res.status(200).json(cdnHeadersObject);
  } catch (error) {
    res
      .status(500)
      .send("Internal server error. Please try again later", error);
  }

  // TODO add more CDN header checks: https://chatgpt.com/c/6748a119-9d58-800c-aab9-75d4ae1d1667
};

export default cdnCheckHandler;
