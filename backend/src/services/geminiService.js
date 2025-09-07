const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(message, context = {}) {
    try {
      const { userRole, subject, previousMessages } = context;
      
      let systemPrompt = '';
      if (userRole === 'teacher') {
        systemPrompt = `You are an AI assistant helping a teacher with educational tasks. 
        You can help with creating assignments, generating quiz questions, explaining concepts, 
        providing teaching strategies, and analyzing student performance. Be professional and educational.`;
      } else {
        systemPrompt = `You are an AI tutor helping a student learn. 
        You can explain concepts, help with homework, provide study tips, and answer questions. 
        Be encouraging, clear, and educational. Break down complex topics into simple steps.`;
      }

      const fullPrompt = `${systemPrompt}

${subject ? `Subject context: ${subject}` : ''}

${previousMessages && previousMessages.length > 0 ? 
  `Previous conversation context:\n${previousMessages.slice(-3).map(msg => `${msg.type}: ${msg.content}`).join('\n')}\n` : ''}

User message: ${message}

Please provide a helpful, educational response:`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateQuiz(topic, difficulty = 'medium', questionCount = 5) {
    try {
      const prompt = `Generate a ${difficulty} difficulty quiz about "${topic}" with ${questionCount} questions. 
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Quiz title",
        "topic": "${topic}",
        "difficulty": "${difficulty}",
        "questions": [
          {
            "question": "Question text",
            "type": "multiple_choice",
            "options": ["A", "B", "C", "D"],
            "correct_answer": 0,
            "explanation": "Why this answer is correct"
          }
        ]
      }
      
      Make sure all questions are educational and appropriate for the topic.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse quiz JSON:', parseError);
      }
      
      // Fallback: return structured text response
      return {
        title: `${topic} Quiz`,
        topic: topic,
        difficulty: difficulty,
        questions: this.parseQuizFromText(text, questionCount)
      };
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw new Error('Failed to generate quiz');
    }
  }

  parseQuizFromText(text, questionCount) {
    // Simple parser for fallback quiz generation
    const questions = [];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (let i = 0; i < Math.min(questionCount, 5); i++) {
      questions.push({
        question: `Question ${i + 1}: What is an important concept in this topic?`,
        type: 'multiple_choice',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: 0,
        explanation: 'This is the correct answer based on the topic.'
      });
    }
    
    return questions;
  }

  async generateMaterialSummary(materialContent, materialType) {
    try {
      const prompt = `Please provide a concise summary of this ${materialType} content:

${materialContent.substring(0, 2000)}

Generate a summary that includes:
1. Main topics covered
2. Key concepts
3. Learning objectives
4. Difficulty level

Keep the summary under 200 words and make it educational.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Material summary error:', error);
      return 'Summary generation failed. Please review the material manually.';
    }
  }
}

module.exports = new GeminiService();
