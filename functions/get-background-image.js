const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query: 'nature',
        orientation: 'landscape',
      },
      headers: {
        'Accept-Version': 'v1',
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
    if (response.status >= 400 && response.status <= 599) {
      const fallback = require('./data/unsplash-fallback-image.json');
      return { statusCode: 200, body: JSON.stringify(fallback) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
