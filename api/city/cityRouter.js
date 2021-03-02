const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Cities = require('./cityModel');
const router = express.Router();

router.get('/', function (req, res) {
  Cities.findAll()
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Cities.findById(id)
    .then((city) => {
      if (city) {
        res.status(200).json(city);
      } else {
        res.status(404).json({ error: 'CityNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/', function (req, res) {
  const city = req.body;
  if (city) {
    const id = city.id || 0;
    Cities.findById(id)
      .then(
        Cities.update(id, city)
          .then((updated) => {
            res.status(200).json({ message: 'city created', city: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update city '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find city '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Cities.findById(id).then((city) => {
      Cities.remove(city.id).then(() => {
        res
          .status(200)
          .json({ message: `City '${id}' was deleted.`, city: city });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete city with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
