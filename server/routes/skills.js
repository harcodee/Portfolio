const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /api/skills - grouped skills data
router.get('/', (req, res) => {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../data/skills.json'), 'utf8');
    const skills = JSON.parse(rawData);
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read skills data' });
  }
});

module.exports = router;
