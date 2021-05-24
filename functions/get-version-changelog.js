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

  if (version) {
    const index = versionChangeLogs.findIndex((changelog) => semverGt(changelog.version, version));
    if (index >= 0) {
      versionChangeLogs = versionChangeLogs.slice(index);
    }
  }

  if (nextVersion) {
    const index = versionChangeLogs.findIndex((changelog) => semverGt(changelog.version, nextVersion));
    if (index >= 0) {
      versionChangeLogs = versionChangeLogs.slice(0, index);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(versionChangeLogs),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
};
