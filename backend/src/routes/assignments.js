const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getSubmissions,
  gradeSubmission
} = require('../controllers/assignmentController');

const {
  getDoubts,
  answerDoubt,
  updateDoubtStatus,
  deleteDoubt
} = require('../controllers/doubtController');

// All assignment routes require teacher authentication
router.use(authenticate);
router.use(requireRole('teacher'));

// POST /api/assignments - Create new assignment
router.post('/', upload.array('attachments', 5), createAssignment);

// GET /api/assignments - Get all assignments for teacher
router.get('/', getAssignments);

// GET /api/assignments/:assignmentId - Get specific assignment
router.get('/:assignmentId', getAssignmentById);

// PUT /api/assignments/:assignmentId - Update assignment
router.put('/:assignmentId', updateAssignment);

// DELETE /api/assignments/:assignmentId - Delete assignment
router.delete('/:assignmentId', deleteAssignment);

// GET /api/assignments/:assignmentId/submissions - Get submissions for assignment
router.get('/:assignmentId/submissions', getSubmissions);

// POST /api/assignments/submissions/:submissionId/grade - Grade a submission (changed from PUT to POST)
router.post('/submissions/:submissionId/grade', gradeSubmission);

// Doubt routes for assignments (frontend compatibility)
// GET /api/assignments/:assignmentId/doubts - Get doubts for assignment
router.get('/:assignmentId/doubts', getDoubts);

// POST /api/assignments/:assignmentId/doubts - Create doubt for assignment
router.post('/:assignmentId/doubts', (req, res) => {
  // This would be handled by student routes, but adding for completeness
  res.status(501).json({ success: false, message: 'Not implemented for teacher portal' });
});

module.exports = router;
