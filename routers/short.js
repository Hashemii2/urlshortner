const Urls = require('../models/url');

module.exports = (app) => {
  app.get('/', async (req, res) => {
    res.render('index', { url: '' });
  });

  app.post('/shortUrls', async (req, res) => {
    const fullurl = req.body.fullUrl;

    let url = await Urls.findOne({ fullurl });

    if (!url) {
      url = await Urls.create({ fullurl });
    }

    let s = res.cookie('url', url.shorturl);
    res.render('short', { url });
  });

  app.get('/:shortUrl', async (req, res) => {
    const shorturl = req.params.shortUrl;
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
