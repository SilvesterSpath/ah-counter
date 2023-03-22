const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Count = require('../models/Count');

// @route GET api/counts
// @desc Get all counts
// @access Public
router.get('/', async (req, res) => {
  try {
    const counts = await Count.find({}).sort({ date: -1 });
    res.json(counts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/counts
// @desc Add new message
// @access Public
router.post(
  '/',
  [check('count', 'Count is required!').not().isEmpty()],
  [check('person', 'Person is required!').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { count, person, date } = req.body;

    try {
      const newCount = new Count({
        count,
        person,
        date,
      });

      const newM = await newCount.save();
      res.json(newM);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/counts/:id
// @desc Update a count
// @access Public
router.put('/:id', async (req, res) => {
  const { person, count } = req.body;

  // Build a contact object
  const messageFields = {};
  if (person) messageFields.person = person;
  if (count) messageFields.count = count;

  try {
    let count = await Count.findById(req.params.id);
    if (!count) {
      return res.status(404).json({ message: 'Count not found' });
    }

    // Now make the actual update
    count = await Count.findByIdAndUpdate(
      req.params.id,
      { $set: messageFields },
      { new: true }
    );

    res.json(count);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/counts/:id
// @desc Delete a count
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    let count = await Count.findById(req.params.id);
    if (!count) {
      return res.status(404).json({ message: 'Count not found' });
    }
    await Count.findByIdAndRemove(req.params.id);

    res.json({ message: 'Count Removed!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
