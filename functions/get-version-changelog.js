const changelogs = require('./data/changelogs.json');
const semverGt = require('semver/functions/gt');

exports.handler = async (event, context) => {
  const version = event.queryStringParameters.version;
  const nextVersion = event.queryStringParameters.next_version;
  let versionChangeLogs = changelogs.map((changelog) => ({
    ...changelog,
    imageLight: process.env.URL + changelog.imageLight,
    imageDark: process.env.URL + changelog.imageDark,
  }));

  if (!version && !nextVersion) {
    return {
      statusCode: 200,
      body: JSON.stringify(versionChangeLogs),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  const versionIndex = version ? versionChangeLogs.findIndex((changelog) => semverGt(changelog.version, version)) : -1;
  let nextVersionIndex = nextVersion
    ? versionChangeLogs.findIndex((changelog) => semverGt(changelog.version, nextVersion))
    : -1;
  if (versionIndex < 0 && nextVersionIndex < 0) {
    return {
      statusCode: 200,
      body: JSON.stringify([]),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  if (versionIndex >= 0) {
    versionChangeLogs = versionChangeLogs.slice(versionIndex);
  }
  if (nextVersionIndex >= 0) {
    nextVersionIndex -= versionIndex >= 0 ? versionIndex : 0;
    versionChangeLogs = versionChangeLogs.slice(0, nextVersionIndex);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(versionChangeLogs),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
