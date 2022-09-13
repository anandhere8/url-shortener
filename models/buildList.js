const shortId = require('shortid')

const buildList = (fullUrl) => {
  const list = {
    fullUrl: fullUrl,
    shortUrl : shortId.generate()
  }
  return list;
}

module.exports = buildList;