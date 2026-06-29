const Project = require('../models/Project');

// GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
};

// GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

// POST /api/projects
exports.createProject = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    if (typeof data.techStack === 'string') data.techStack = data.techStack.split(',').map(s => s.trim());
    const project = await Project.create(data);
    res.status(201).json({ success: true, data: project });
  } catch (err) { next(err); }
};

// PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    if (typeof data.techStack === 'string') data.techStack = data.techStack.split(',').map(s => s.trim());
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
};

// DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
};
