const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', { url: '' });
  });

  app.post('/qrcode', (req, res) => {
    const url = req.body.fullUrl;

    QRCode.toDataURL(url, function (err, qrCode) {
      if (err) res.sendStatus(404);

      let imagePath = path.join('store', Date.now() + '.png');
      QRCode.toFile(imagePath, url);

      res.render('qr', { qrCode, imagePath });
    });
  });

  app.get('/download', function (req, res, next) {
    let path = req.query.imagePath;

    res.download(path, (err) => {
      if (err) console.log(err);

      fs.unlink(path, () => {});
    });
  });
};
