import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Lightbulb, 
  BookOpen, 
  ClipboardList, 
  Wand2,
  MessageCircle,
  Sparkles,
  Brain,
  Users,
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      content: `Hello ${user?.name}! I'm your AI learning assistant. I can help you with homework questions, generate quizzes, explain concepts, and much more. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  const isTeacher = user?.role === 'teacher';

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    const newUserMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await apiService.chatWithAI(userMessage, {
        role: user?.role,
        userId: user?.id
      });

      if (response.success && response.data) {
        const aiResponse: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response.data.response || response.data.message || 'I apologize, but I encountered an issue processing your request.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        const errorMessage: ChatMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: 'I apologize, but I encountered an error. Please try again later.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I encountered a network error. Please check your connection and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Let me break it down for you step by step...",
      "I understand what you're asking. Here's how I would approach this problem...",
      "Excellent topic to explore! Based on the curriculum, I'd recommend focusing on...",
      "I can help you with that! Let me provide some key insights and examples...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleGenerateQuiz = async () => {
    if (!quizTopic.trim() || quizLoading) return;

    setQuizLoading(true);
    const topic = quizTopic;
    setQuizTopic('');

    try {
      const response = await apiService.generateQuiz({
        topic,
        difficulty: 'medium',
        questionCount: 5,
        questionTypes: ['multiple_choice', 'short_answer']
      });

      if (response.success && response.data) {
        const quizMessage: ChatMessage = {
          id: Date.now(),
          type: 'ai',
          content: response.data.quiz || response.data.message || `I've generated a quiz on "${topic}". Please check the response for details.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, quizMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: Date.now(),
          type: 'ai',
          content: `I encountered an error generating the quiz on "${topic}". Please try again.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now(),
        type: 'ai',
        content: `I encountered a network error while generating the quiz. Please try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setQuizLoading(false);
    }
  };

  const quickActions = isTeacher ? [
    { icon: ClipboardList, label: "Generate Quiz", action: "quiz" },
    { icon: BookOpen, label: "Create Materials", action: "materials" },
    { icon: Users, label: "Student Analytics", action: "analytics" },
    { icon: Lightbulb, label: "Teaching Tips", action: "tips" }
  ] : [
    { icon: Lightbulb, label: "Homework Help", action: "homework" },
    { icon: BookOpen, label: "Explain Concept", action: "explain" },
    { icon: Brain, label: "Study Tips", action: "study" },
    { icon: ClipboardList, label: "Practice Quiz", action: "practice" }
  ];

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      homework: "I need help with my homework assignment. Can you guide me through the problem-solving process?",
      explain: "Can you explain a complex concept in simple terms with examples?",
      study: "What are the best study strategies for my upcoming exams?",
      practice: "Can you create a practice quiz to test my knowledge?",
      quiz: "Help me generate quiz questions for my students.",
      materials: "Suggest engaging learning materials for my classroom.",
      analytics: "How can I better understand my students' learning patterns?",
      tips: "What are effective teaching strategies for engaging students?"
    };

    const message = actionMessages[action as keyof typeof actionMessages];
    if (message) {
      setInputMessage(message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-gradient-primary">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            {isTeacher 
              ? "Generate quizzes, get teaching insights, and create engaging content"
              : "Get homework help, explanations, and personalized learning support"
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="shadow-card h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat Assistant
              </CardTitle>
              <CardDescription>Ask questions, get explanations, and receive personalized help</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-gradient-primary"
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-2 h-auto py-3"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Quiz Generator (Teacher Only) */}
          {isTeacher && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-secondary" />
                  Quiz Generator
                </CardTitle>
                <CardDescription>Generate quizzes instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  placeholder="Enter topic (e.g., Calculus)"
                />
                <Button 
                  onClick={handleGenerateQuiz}
                  className="w-full bg-gradient-secondary"
                  disabled={!quizTopic.trim() || quizLoading}
                >
                  {quizLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* AI Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  📚 Concept Explanations
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🧮 Problem Solving
                </Badge>
                <Badge variant="outline" className="text-xs">
                  📝 Essay Writing Help
                </Badge>
                <Badge variant="outline" className="text-xs">
                  🎯 Study Planning
                </Badge>
                {isTeacher && (
                  <>
                    <Badge variant="outline" className="text-xs">
                      📊 Student Analytics
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🎓 Curriculum Design
                    </Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;