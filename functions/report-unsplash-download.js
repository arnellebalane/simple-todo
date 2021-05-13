const axios = require('axios');

exports.handler = async (event, context) => {
  if (!event.body) {
    return { statusCode: 400, body: { message: 'Request body not found' } };
  }
  const body = JSON.parse(event.body);
  if (!body.download_location) {
    return { statusCode: 400, body: { message: 'Parameter download_location not found in request body' } };
  }

  console.log(body.download_location);
  try {
    await axios.get(body.download_location, {
      params: {
        client_id: process.env.UNSPLASH_ACCESS_KEY,
      },
    });
  } catch (error) {
    console.error(error);
  }

  return { statusCode: 200 };
};
