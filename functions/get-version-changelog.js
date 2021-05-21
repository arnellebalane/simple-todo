const changelogs = require('./data/changelogs.json');
const semverGt = require('semver/functions/gt');

exports.handler = async (event, context) => {
  const version = event.queryStringParameters.version;
  if (!version) {
    return {
      statusCode: 400,
      body: 'Missing "version" query parameter.',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  let versionChangeLogs = [];
  const index = changelogs.findIndex((changelog) => semverGt(changelog.version, version));

  if (index >= 0) {
    versionChangeLogs = changelogs.slice(index).map((changelog) => ({
      ...changelog,
      imageLight: process.env.URL + changelog.imageLight,
      imageDark: process.env.URL + changelog.imageDark,
    }));
  }

  return {
    statusCode: 200,
    body: JSON.stringify(versionChangeLogs),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
