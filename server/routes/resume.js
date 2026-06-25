const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// GET /api/resume/timeline - experience + education + certs JSON
router.get('/timeline', (req, res) => {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../data/resume.json'), 'utf8');
    const resumeData = JSON.parse(rawData);
    res.json(resumeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read resume timeline data' });
  }
});

// GET /api/resume - stream PDF as download
router.get('/', (req, res) => {
  const resumePath = path.join(__dirname, '../static/resume.pdf');

  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({
      error: 'Resume PDF not found. Please add resume.pdf to server/static/',
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

  const stream = fs.createReadStream(resumePath);
  stream.pipe(res);
  stream.on('error', () => {
    res.status(500).json({ error: 'Error streaming resume' });
  });
});

module.exports = router;
