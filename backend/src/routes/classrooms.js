const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const {
  createClassroom,
  getClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
  removeStudent,
  generateInviteCode,
  assignToClassroom
} = require('../controllers/classroomController');

// All classroom routes require teacher authentication
router.use(authenticate);
router.use(requireRole('teacher'));

// POST /api/classrooms - Create new classroom
router.post('/', createClassroom);

// GET /api/classrooms - Get all classrooms for teacher
router.get('/', getClassrooms);

// GET /api/classrooms/:classroomId - Get specific classroom
router.get('/:classroomId', getClassroomById);

// PUT /api/classrooms/:classroomId - Update classroom
router.put('/:classroomId', updateClassroom);

// DELETE /api/classrooms/:classroomId - Delete classroom
router.delete('/:classroomId', deleteClassroom);

// DELETE /api/classrooms/:classroomId/students/:studentId - Remove student from classroom
router.delete('/:classroomId/students/:studentId', removeStudent);

// GET /api/classrooms/:classroomId/invite-code - Get classroom invite code
router.get('/:classroomId/invite-code', generateInviteCode);

// POST /api/classrooms/:classroomId/invite-code - Generate new invite code (for frontend compatibility)
router.post('/:classroomId/invite-code', generateInviteCode);

// POST /api/classrooms/:classroomId/assign - Assign assignment to classroom
router.post('/:classroomId/assign', assignToClassroom);

module.exports = router;
