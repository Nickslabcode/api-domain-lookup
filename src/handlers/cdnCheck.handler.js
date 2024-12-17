import { requestHeaders } from '../common/requestHeaders.js';
import { cdnHeadersMapping, CLOUDFRONT } from '../common/cdnHeadersMapping.js';

const cdnCheckHandler = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    return res.status(400).send('Domain query parameter is required!');
  }

  const headers = requestHeaders(domain);

  try {
    const response = await fetch(`https://${domain}`, {
      headers,
    });

    const getResponseHeader = headerName => response.headers.get(headerName);

    const cdnHeadersObject = Object.entries(cdnHeadersMapping).reduce(
      (acc, [header, cdnKey]) => {
        if (getResponseHeader(header)) {
          acc[cdnKey] = true;
        }

        return acc;
      },
      {}
    );

    if (getResponseHeader(CLOUDFRONT)?.includes('HIT from cloudFront')) {
      cdnHeadersObject.cloudFront = true;
    }

    res.status(200).json(cdnHeadersObject);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error. Please try again later',
      error: error.message,
    });
  }
};

export default cdnCheckHandler;
