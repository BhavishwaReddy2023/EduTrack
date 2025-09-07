const Student = require('../models/Student');
const { assignmentsData, announcementsData, performanceData } = require('../data/seedData');

// Get student dashboard data
const getStudentDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Dashboard summary data
    const dashboardData = {
      student: {
        name: student.name,
        grade: student.grade,
        avatar: student.avatar,
        stats: student.stats,
        badges: student.badges
      },
      recentAssignments: assignmentsData.slice(0, 3).map(assignment => ({
        ...assignment,
        id: Math.random().toString(36).substr(2, 9),
        status: Math.random() > 0.5 ? 'pending' : 'completed'
      })),
      announcements: announcementsData.slice(0, 2),
      weeklyProgress: performanceData.weeklyProgress,
      upcomingDeadlines: assignmentsData.map(assignment => ({
        ...assignment,
        id: Math.random().toString(36).substr(2, 9),
        daysLeft: Math.ceil((assignment.dueDate - new Date()) / (1000 * 60 * 60 * 24))
      })).slice(0, 3)
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get student assignments
const getStudentAssignments = async (req, res) => {
  try {
    const { status, subject } = req.query;
    
    let assignments = assignmentsData.map(assignment => ({
      ...assignment,
      id: Math.random().toString(36).substr(2, 9),
      status: Math.random() > 0.3 ? 'pending' : 'completed',
      submittedAt: Math.random() > 0.5 ? new Date() : null,
      grade: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 60 : null
    }));

    // Filter by status if provided
    if (status) {
      assignments = assignments.filter(assignment => assignment.status === status);
    }

    // Filter by subject if provided
    if (subject) {
      assignments = assignments.filter(assignment => 
        assignment.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    res.json({
      assignments,
      summary: {
        total: assignments.length,
        pending: assignments.filter(a => a.status === 'pending').length,
        completed: assignments.filter(a => a.status === 'completed').length,
        overdue: assignments.filter(a => a.status === 'pending' && new Date(a.dueDate) < new Date()).length
      }
    });
  } catch (error) {
    console.error('Assignments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get student performance data
const getStudentPerformance = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const performanceReport = {
      overview: {
        averageScore: student.stats.averageScore,
        rank: student.stats.rank,
        totalPoints: student.stats.totalPoints,
        level: student.stats.level,
        streak: student.stats.streak,
        completionRate: student.getCompletionPercentage()
      },
      subjects: student.subjects,
      weeklyProgress: performanceData.weeklyProgress,
      subjectPerformance: performanceData.subjectPerformance,
      monthlyTrends: [
        { month: 'Jan', score: 78 },
        { month: 'Feb', score: 82 },
        { month: 'Mar', score: 85 },
        { month: 'Apr', score: 88 }
      ],
      achievements: student.badges.map(badge => ({
        name: badge,
        description: getBadgeDescription(badge),
        earnedAt: new Date()
      }))
    };

    res.json(performanceReport);
  } catch (error) {
    console.error('Performance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get student profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ student });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update student profile
const updateStudentProfile = async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'address', 'preferences', 'guardian'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const student = await Student.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      student 
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get student announcements
const getStudentAnnouncements = async (req, res) => {
  try {
    const announcements = announcementsData.map(announcement => ({
      ...announcement,
      id: Math.random().toString(36).substr(2, 9),
      readAt: Math.random() > 0.5 ? new Date() : null
    }));

    res.json({
      announcements,
      unreadCount: announcements.filter(a => !a.readAt).length
    });
  } catch (error) {
    console.error('Announcements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, attachments } = req.body;

    // Simulate assignment submission
    const submission = {
      id: Math.random().toString(36).substr(2, 9),
      assignmentId: id,
      studentId: req.user._id,
      content,
      attachments: attachments || [],
      submittedAt: new Date(),
      status: 'submitted',
      grade: null,
      feedback: null
    };

    res.json({
      message: 'Assignment submitted successfully',
      submission
    });
  } catch (error) {
    console.error('Assignment submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get student doubts
const getStudentDoubt = async (req, res) => {
  try {
    const doubts = [
      {
        id: '1',
        title: 'Quadratic Formula Confusion',
        subject: 'Mathematics',
        description: 'I am having trouble understanding when to use the quadratic formula vs factoring',
        status: 'open',
        createdAt: new Date(),
        responses: []
      },
      {
        id: '2',
        title: 'Chemical Bonding Types',
        subject: 'Science',
        description: 'Can someone explain the difference between ionic and covalent bonds?',
        status: 'resolved',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        responses: [
          {
            id: '1',
            content: 'Ionic bonds form between metals and non-metals...',
            author: 'Teacher',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
          }
        ]
      }
    ];

    res.json({ doubts });
  } catch (error) {
    console.error('Doubts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new doubt
const createDoubt = async (req, res) => {
  try {
    const { title, subject, description } = req.body;

    const doubt = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      subject,
      description,
      studentId: req.user._id,
      status: 'open',
      createdAt: new Date(),
      responses: []
    };

    res.status(201).json({
      message: 'Doubt created successfully',
      doubt
    });
  } catch (error) {
    console.error('Create doubt error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to get badge descriptions
const getBadgeDescription = (badge) => {
  const descriptions = {
    consistent: 'Maintained a study streak for multiple days',
    achiever: 'Consistently scored above 85% in assignments',
    creator: 'Actively participated in creative projects',
    helper: 'Helped fellow students with their doubts',
    early_bird: 'Consistently submitted assignments before deadline',
    perfectionist: 'Achieved perfect scores in multiple assignments',
    dedicated: 'Showed exceptional dedication to studies'
  };
  return descriptions[badge] || 'Achievement unlocked';
};

module.exports = {
  getStudentDashboard,
  getStudentAssignments,
  getStudentPerformance,
  getStudentProfile,
  updateStudentProfile,
  getStudentAnnouncements,
  submitAssignment,
  getStudentDoubt,
  createDoubt
};
