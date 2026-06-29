const Profile = require('../models/Profile');

exports.getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      if (req.file.fieldname === 'photo') data.photoUrl = `/uploads/${req.file.filename}`;
      if (req.file.fieldname === 'resume') data.resumeUrl = `/uploads/${req.file.filename}`;
    }
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(data);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, data, { new: true, runValidators: true });
    }
    res.json({ success: true, data: profile });
  } catch (err) { next(err); }
};
