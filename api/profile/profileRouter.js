const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Profiles = require('./profileModel');
const Cities = require('../city/cityModel');
const router = express.Router();

router.get('/', function (req, res) {
  Profiles.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Profiles.findById(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id/city', (req, res) => {
  const { id } = req.params;
  Profiles.findCities(id)
    .then((city) => {
      if (city.length) {
        res.status(200).json(city);
      } else {
        res
          .status(404)
          .json({ message: 'could not find city for given user ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'failed to get city', err });
    });
});

router.post('/', async (req, res) => {
  const profile = req.body;
  if (profile) {
    const id = profile.id || 0;
    try {
      await Profiles.findById(id).then(async (pf) => {
        if (pf == undefined) {
          //profile not found so lets insert it
          await Profiles.create(profile).then((profile) =>
            res
              .status(200)
              .json({ message: 'profile created', profile: profile[0] })
          );
        } else {
          res.status(400).json({ message: 'profile already exists' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Profile missing' });
  }
});

router.put('/', function (req, res) {
  const profile = req.body;
  if (profile) {
    const id = profile.id || 0;
    Profiles.findById(id)
      .then(
        Profiles.update(id, profile)
          .then((updated) => {
            res
              .status(200)
              .json({ message: 'profile created', profile: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update profile '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find profile '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  try {
    Profiles.findById(id).then((profile) => {
      Profiles.remove(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile: profile });
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

router.post('/:id/city', async (req, res) => {
  const city = req.body;
  city.profile_id = req.params.id;

  try {
    const newCity = await Cities.add(city);
    res.status(201).json(newCity);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

router.delete('/:id/city/:city_id', async (req, res, next) => {
  const { city_id } = req.params;

  const city = Cities.findById(city_id);

  try {
    if (city) {
      await Cities.remove(city_id);

      res.status(200).json({
        city_id,
        message: 'city deleted',
      });
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to delete city', ...err });
  }
});

module.exports = router;
