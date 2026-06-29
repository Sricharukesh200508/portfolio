const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// POST /api/contact - public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const contact = await Contact.create({
      name, email, subject, message,
      ip: req.ip
    });
    // Send notification email
    try {
      await sendEmail({
        to: process.env.EMAIL_TO || 'sricharu73@gmail.com',
        subject: `[Portfolio Contact] ${subject}`,
        html: `
          <div style="font-family: monospace; background: #020510; color: #00F5FF; padding: 20px; border: 1px solid #00F5FF22;">
            <h2 style="color: #00F5FF;">New Message Received</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border-color: #00F5FF22;" />
            <p style="color: #E8F4FD; white-space: pre-wrap;">${message}</p>
          </div>
        `
      });
    } catch (emailErr) {
      console.error('Email send error:', emailErr.message);
    }
    res.status(201).json({ success: true, message: 'Message received. Transmission successful.' });
  } catch (err) { next(err); }
};

// GET /api/messages - protected
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    const unreadCount = await Contact.countDocuments({ read: false });
    res.json({ success: true, data: messages, unreadCount });
  } catch (err) { next(err); }
};

// PATCH /api/messages/:id/read - protected
exports.markRead = async (req, res, next) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, data: msg });
  } catch (err) { next(err); }
};

// DELETE /api/messages/:id - protected
exports.deleteMessage = async (req, res, next) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Message not found' });
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) { next(err); }
};

// DELETE /api/messages/clear-all - protected
exports.clearAll = async (req, res, next) => {
  try {
    await Contact.deleteMany({});
    res.json({ success: true, message: 'All messages cleared' });
  } catch (err) { next(err); }
};
