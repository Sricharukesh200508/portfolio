const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['AI/ML', 'LLMs', 'Cloud', 'Web', 'Databases', 'Tools', 'Languages'],
    default: 'Tools'
  },
  proficiency: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: '⚡' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
