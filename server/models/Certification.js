const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  credentialUrl: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  skills: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
