const Urls = require('../models/url');
const shortId = require('shortid');
const { baseUrl } = require('../baseurl');
const baseurl = baseUrl.url;

module.exports = (app) => {
  app.get('/', async (req, res) => {
    res.render('index', { url: '' });
  });

  app.post('/shortUrls', async (req, res) => {
    const fullurl = req.body.fullUrl;

    let url = await Urls.findOne({ fullurl });

    if (!url) {
      const id = shortId.generate();

      url = await Urls.create({ fullurl, shorturl: baseurl + id });
    }

    res.render('short', { url });
  });

  app.get('/:shortUrl', async (req, res) => {
    let shorturl = baseurl + req.params.shortUrl;

    try {
      const found = await Urls.findOne({ shorturl });

      if (!found)
        return res
          .status(404)
          .send('<h1>آدرس پیدا نشد، مطمئن شوید که آدرس به درستی وارد شده</h1>');

      found.clicks++;
      found.save();

      res.redirect(found.fullurl);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
};
