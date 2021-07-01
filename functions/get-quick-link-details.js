const axios = require('axios');
const cheerio = require('cheerio');
require('./_lib/sentry');

exports.handler = async (event, context) => {
  const url = event.queryStringParameters.url;
  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Query parameter "url" is required' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  let response = { icon: null, title: url, url };

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const iconElement = $('link[rel~="icon"]');
    if (iconElement.length > 0) {
      const icon = iconElement.last().attr('href');
      const httpPattern = /^https?:\/\//;
      if (httpPattern.test(icon)) {
        response.icon = icon;
      } else {
        const iconUrl = new URL(url);
        iconUrl.pathname = icon;
        response.icon = iconUrl.toString();
      }
    } else {
      const iconUrl = new URL(url);
      iconUrl.pathname = 'favicon.ico';
      response.icon = iconUrl.toString();
    }

    const titleElement = $('title');
    if (titleElement.length > 0) {
      response.title = titleElement.last().text();
    }
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
