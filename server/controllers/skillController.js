const Skill = require('../models/Skill');

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    res.json({ success: true, data: skills });
  } catch (err) { next(err); }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) { next(err); }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, data: skill });
  } catch (err) { next(err); }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted' });
  } catch (err) { next(err); }
};
