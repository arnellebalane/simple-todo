const axios = require('axios');
require('./_lib/sentry');

exports.handler = async (event, context) => {
  if (!event.body) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Request body not found' }) };
  }
  const body = JSON.parse(event.body);
  if (!body.download_location) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Parameter download_location not found in request body' }),
    };
  }

  try {
    await axios.get(body.download_location, {
      params: {
        client_id: process.env.UNSPLASH_ACCESS_KEY,
      },
    });
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
