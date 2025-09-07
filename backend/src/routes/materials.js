const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  uploadMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  trackDownload
} = require('../controllers/materialController');

// All material routes require teacher authentication
router.use(authenticate);
router.use(requireRole('teacher'));

// POST /api/materials/upload - Upload new material
router.post('/upload', upload.single('file'), uploadMaterial);

// GET /api/materials - Get all materials for teacher
router.get('/', getMaterials);

// GET /api/materials/:materialId - Get specific material
router.get('/:materialId', getMaterialById);

// PUT /api/materials/:materialId - Update material
router.put('/:materialId', updateMaterial);

// DELETE /api/materials/:materialId - Delete material
router.delete('/:materialId', deleteMaterial);

// POST /api/materials/:materialId/download - Track download
router.post('/:materialId/download', trackDownload);

module.exports = router;
