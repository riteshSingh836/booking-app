const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const Property = require('../models/Property');
const router = express.Router();

router.post('/', authenticate, authorize(['PropertyAdmin', 'SuperAdmin']), async (req, res) => {
  const { name, location, price, amenities } = req.body;
  const property = new Property({ name, location, price, amenities, admin: req.user.id });
  await property.save();
  res.status(201).json(property);
});

router.put('/:id', authenticate, authorize(['PropertyAdmin', 'SuperAdmin']), async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  Object.assign(property, req.body);
  await property.save();
  res.status(200).json(property);
});

router.delete('/:id', authenticate, authorize(['SuperAdmin']), async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.status(204).json();
});

module.exports = router;
