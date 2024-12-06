import { requestHeaders } from "../common/requestHeaders.js";

const cdnCheckHandler = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).send("Domain query parameter is required!");
  }

  const headers = requestHeaders(domain);

  try {
    const response = await fetch(`https://${domain}`, {
      headers,
    });

    const getResponseHeader = (headerName) => response.headers.get(headerName);

    const cdnHeadersObject = {};

    switch (true) {
      case !!getResponseHeader("x-sg-cdn"):
        cdnHeadersObject.siteGround = true;

      case !!getResponseHeader("cf-cache-status"):
        cdnHeadersObject.cloudFlare = true;

      case !!getResponseHeader("x-bunny-cache"):
        cdnHeadersObject.bunny = true;

      case getResponseHeader("x-cache")?.includes("HIT from cloudFront"):
        cdnHeadersObject.cloudFront = true;

      case !!getResponseHeader("x-akamai-transformed"):
        cdnHeadersObject.akamai = true;

      case !!getResponseHeader("x-sp-cache-status"):
        cdnHeadersObject.stackPath = true;

      case !!getResponseHeader("x-azure-ref"):
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
};

export default cdnCheckHandler;
