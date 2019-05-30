const GOOGLE_API_KEY = process.env.ALAYA_GOOGLE_API_KEY;

const googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_API_KEY,
});

export function getAddresses(req, res) {
  const { address } = req.query;

  googleMapsClient.geocode({
    address,
  }, (err, response) => {
    if (!err) {
      res.json(response.json.results);
    } else {
      res.status(500);
    }
  });
}
