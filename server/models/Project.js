const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  category: {
    type: String,
    enum: ['ML', 'Computer Vision', 'Web', 'Cloud', 'NLP', 'Other'],
    default: 'Other'
  },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  hasPublication: { type: Boolean, default: false },
  publicationName: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
