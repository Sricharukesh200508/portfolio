const Experience = require('../models/Experience');

exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: experiences });
  } catch (err) { next(err); }
};

exports.createExperience = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (typeof data.bullets === 'string') data.bullets = data.bullets.split('\n').filter(b => b.trim());
    const exp = await Experience.create(data);
    res.status(201).json({ success: true, data: exp });
  } catch (err) { next(err); }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (typeof data.bullets === 'string') data.bullets = data.bullets.split('\n').filter(b => b.trim());
    const exp = await Experience.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, data: exp });
  } catch (err) { next(err); }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) { next(err); }
};
