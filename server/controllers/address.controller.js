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
      const addresses = response.json.results.map(a => ({
        formattedAddress: a.formatted_address,
        location: a.geometry.location,
      }));

      res.json(addresses);
    } else {
      res.status(500);
    }
  });
}
