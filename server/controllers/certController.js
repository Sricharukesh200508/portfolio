const Certification = require('../models/Certification');

exports.getCertifications = async (req, res, next) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) { next(err); }
};

exports.createCertification = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    const cert = await Certification.create(data);
    res.status(201).json({ success: true, data: cert });
  } catch (err) { next(err); }
};

exports.updateCertification = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;
    const cert = await Certification.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.json({ success: true, data: cert });
  } catch (err) { next(err); }
};

exports.deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.json({ success: true, message: 'Certification deleted' });
  } catch (err) { next(err); }
};
