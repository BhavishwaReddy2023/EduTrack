const geminiService = require('../services/geminiService');

const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;
    const user = req.user;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Prepare context for AI
    const aiContext = {
      userRole: user.role,
      subject: context?.subject,
      previousMessages: context?.previousMessages || []
    };

    // Generate AI response
    const response = await geminiService.generateResponse(message, aiContext);

    res.json({
      success: true,
      data: {
        message: response,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate AI response'
    });
  }
};

const generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty = 'medium', questionCount = 5 } = req.body;
    const user = req.user;

    // Only teachers can generate quizzes
    if (user.role !== 'teacher') {
      return res.status(403).json({
        success: false,
        message: 'Only teachers can generate quizzes'
      });
    }

    if (!topic || !topic.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Topic is required'
      });
    }

    const quiz = await geminiService.generateQuiz(topic, difficulty, questionCount);

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate quiz'
    });
  }
};

const generateMaterialSummary = async (req, res) => {
  try {
    const { content, materialType } = req.body;
    const user = req.user;

    if (user.role !== 'teacher') {
      return res.status(403).json({
        success: false,
        message: 'Only teachers can generate material summaries'
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }

    const summary = await geminiService.generateMaterialSummary(content, materialType);

    res.json({
      success: true,
      data: {
        summary,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Material summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate material summary'
    });
  }
};

module.exports = {
  chatWithAI,
  generateQuiz,
  generateMaterialSummary
};
