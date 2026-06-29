const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  location: { type: String, default: '' },
  type: {
    type: String,
    enum: ['internship', 'full-time', 'part-time', 'freelance'],
    default: 'internship'
  },
  bullets: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
