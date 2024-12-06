import whois from "whois";

const whoisHandler = async (req, res) => {
  const domain = req.query.domain;

  if (!domain) {
    res.status(400).send("Domain query parameter is required!");
  }

  try {
    whois.lookup(domain, (err, data) => {
      if (err) throw new Error(`Something went wrong: ${err}`);

      res.status(200).json({ answer: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error. Please try again later.");
  }
};

export default whoisHandler;
