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

    let data = response.data;
    if (response.status >= 400 && response.status <= 599) {
      data = require('./data/unsplash-fallback-image.json');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        photo_url: data.urls.regular,
        photo_url_full: data.urls.full,
        photo_link: data.links.html,
        photo_blurhash: data.blur_hash,
        user_name: data.user.name,
        user_link: data.user.links.html,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.log(error);

    data = require('./data/unsplash-fallback-image.json');
    return {
      statusCode: 200,
      body: JSON.stringify({
        photo_url: data.urls.regular,
        photo_url_full: data.urls.full,
        photo_link: data.links.html,
        photo_blurhash: data.blur_hash,
        user_name: data.user.name,
        user_link: data.user.links.html,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
