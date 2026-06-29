const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Sri Charukesh N' },
  tagline: { type: String, default: 'AI Engineer · ML Researcher · LLM Systems Builder' },
  bio: { type: String, default: '' },
  email: { type: String, default: 'sricharu73@gmail.com' },
  linkedin: { type: String, default: 'https://linkedin.com/in/sri-charu-kesh' },
  github: { type: String, default: 'https://github.com/Sricharukesh200508' },
  photoUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  college: { type: String, default: 'SRM Institute of Science and Technology, Tiruchirappalli' },
  degree: { type: String, default: 'B.Tech — Computer Science (AI & ML Specialisation)' },
  cgpa: { type: String, default: '8.6 / 10.0' },
  expectedGraduation: { type: String, default: 'May 2027' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
