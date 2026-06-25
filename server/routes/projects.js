const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper to get fresh project data
const getProjectsData = () => {
  const rawData = fs.readFileSync(path.join(__dirname, '../data/projects.json'), 'utf8');
  return JSON.parse(rawData);
};

// GET /api/projects - all projects, optional ?featured=true/false
router.get('/', (req, res) => {
  try {
    const projects = getProjectsData();
    const { featured } = req.query;

    if (featured !== undefined) {
      const isFeatured = featured === 'true';
      return res.json(projects.filter((p) => p.featured === isFeatured));
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read projects data' });
  }
});

// GET /api/projects/:slug - single project detail
router.get('/:slug', (req, res) => {
  try {
    const projects = getProjectsData();
    const project = projects.find((p) => p.slug === req.params.slug);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to read project detail' });
  }
});

module.exports = router;
