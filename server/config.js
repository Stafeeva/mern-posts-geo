const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  google_api_key: process.env.ALAYA_GOOGLE_API_KEY,
};

export default config;
