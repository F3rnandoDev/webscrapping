const rp = require('request-promise');
const $ = require('cheerio');
var pdfUtil = require('pdf-to-text');

const potusParse = function(url) {
  return rp(url)
    .then(function(html) {
      pdfUtil.info(url, function(err, info) {
        if (err) throw(err);
        return info;    
      });
    })
    .catch(function(err) {
      //handle error
    });
};

module.exports = potusParse;