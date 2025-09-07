import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Calendar,
  Users,
  FileText,
  Send,
  Eye,
  MessageSquare,
  GraduationCap,
  Star,
  MessageCircle
} from 'lucide-react';

const mockAssignments = [
  {
    id: 1,
    title: "Calculus Problem Set #3",
    subject: "Mathematics",
    dueDate: "2025-09-15",
    status: "pending",
    difficulty: "Medium",
    points: 100,
    description: "Solve integration problems and show your work step by step",
    totalStudents: 25,
    submittedCount: 18,
    submissions: [
      { id: 1, studentName: "Alice Johnson", studentId: "s001", submittedAt: "2024-02-14", score: null, content: "My solution to the calculus problems..." },
      { id: 2, studentName: "Bob Smith", studentId: "s002", submittedAt: "2024-02-13", score: 85, content: "Here's my approach to integration..." },
      { id: 3, studentName: "Carol Wilson", studentId: "s003", submittedAt: "2024-02-14", score: null, content: "Step-by-step solution attached..." }
    ],
    doubts: [
      { id: 1, studentName: "Alice Johnson", question: "I'm having trouble with integration by parts. Could you explain step 3?", answer: "Sure! In step 3, you need to identify u and dv...", timestamp: "2024-02-12" },
      { id: 2, studentName: "David Brown", question: "What's the difference between definite and indefinite integrals?", answer: null, timestamp: "2024-02-14" }
    ]
  },
  {
    id: 2,
    title: "Physics Lab Report",
    subject: "Physics",
    dueDate: "2025-08-20",
    status: "submitted",
    difficulty: "Hard",
    points: 150,
    score: 142,
    description: "Analyze the results of the pendulum experiment",
    totalStudents: 20,
    submittedCount: 20,
    submissions: [
      { id: 1, studentName: "Emma Davis", studentId: "s004", submittedAt: "2024-02-09", score: 142, content: "Lab report with detailed analysis..." },
      { id: 2, studentName: "Frank Miller", studentId: "s005", submittedAt: "2024-02-10", score: 138, content: "Pendulum experiment results..." }
    ],
    doubts: [
      { id: 1, studentName: "Emma Davis", question: "Should we include error analysis in the report?", answer: "Yes, error analysis is crucial for any physics lab report...", timestamp: "2024-02-08" }
    ]
  },
  {
    id: 3,
    title: "Chemistry Equations",
    subject: "Chemistry",
    dueDate: "2025-08-18",
    status: "graded",
    difficulty: "Easy",
    points: 75,
    description: "Multiple choice questions on atomic structure",
    totalStudents: 22,
    submittedCount: 5,
    submissions: [
      { id: 1, studentName: "Grace Lee", studentId: "s006", submittedAt: "2024-02-19", score: null, content: "Quiz answers submitted..." }
    ],
    doubts: [
      { id: 1, studentName: "Henry Taylor", question: "Are we allowed to use the periodic table during the quiz?", answer: "Yes, you can refer to the periodic table...", timestamp: "2024-02-18" }
    ]
  },
  {
    id: 4,
    title: "History Essay",
    subject: "History",
    dueDate: "2025-09-25",
    status: "pending",
    difficulty: "Medium",
    points: 120,
    score: 89,
    description: "Write about the causes of World War I",
    totalStudents: 28,
    submittedCount: 26,
    submissions: [
      { id: 1, studentName: "Isabella Garcia", studentId: "s007", submittedAt: "2024-01-29", score: 89, content: "Essay on WWI causes..." },
      { id: 2, studentName: "Jack Thompson", studentId: "s008", submittedAt: "2024-01-30", score: 92, content: "Detailed analysis of WWI..." }
    ],
    doubts: [
      { id: 1, studentName: "Isabella Garcia", question: "Should we focus more on political or economic causes?", answer: "Both are important, but try to balance your analysis...", timestamp: "2024-01-25" }
    ]
  }
];

const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date();
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'bg-success/10 text-success border-success/20';
    case 'graded':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'pending':
      return 'bg-warning/10 text-warning border-warning/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-success/10 text-success border-success/20';
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'hard':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');
  const [assignments, setAssignments] = useState(mockAssignments);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    points: 100
  });
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [gradeInput, setGradeInput] = useState('');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtAnswer, setDoubtAnswer] = useState('');
  const [selectedDoubt, setSelectedDoubt] = useState<any>(null);
  const [submittedAssignments, setSubmittedAssignments] = useState<number[]>([]);

  const handleSubmitAssignment = (assignmentId: number) => {
    setSubmittedAssignments(prev => [...prev, assignmentId]);
    
    const celebrationAlert = () => {
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `
        <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          animation: bounce 0.6s ease-out;
        ">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎉🎊✨</div>
          <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Assignment Submitted Successfully!</h2>
          <p style="opacity: 0.9;">Great job! Your work has been submitted for review.</p>
          <div style="font-size: 2rem; margin-top: 1rem;">🎈🎁🏆</div>
        </div>
        <style>
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
            40%, 43% { transform: translate(-50%, -50%) translateY(-20px); }
            70% { transform: translate(-50%, -50%) translateY(-10px); }
          }
        </style>
      `;
      
      document.body.appendChild(alertDiv);
      
      setTimeout(() => {
        if (alertDiv.parentElement) {
          alertDiv.remove();
        }
      }, 5000);
    };
    
    celebrationAlert();
    
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { 
              ...assignment, 
              status: 'submitted',
              submittedCount: assignment.submittedCount + 1
            }
          : assignment
      )
    );
    
    setSubmissionText('');
  };

  const handleCreateAssignment = () => {
    console.log('Creating assignment:', newAssignment);
  };

  const handleScoreAssignment = (submissionId: number, score: number) => {
    console.log(`Assigning score ${score} to submission ${submissionId}`);
  };

  const handleAnswerDoubt = (doubtId: number, answer: string) => {
    console.log(`Answering doubt ${doubtId}: ${answer}`);
    setDoubtAnswer('');
  };

  if (user?.role === 'student') {
    return (
      <div className="space-y-4 lg:space-y-6 p-2 lg:p-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              View and submit your assignments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <ClipboardList className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockAssignments.length}</p>
                  <p className="text-xs text-muted-foreground">Total Assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-warning/10">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockAssignments.filter(a => a.status === 'pending').length}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-success/10">
                  <Users className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAssignments.reduce((acc, a) => acc + a.submittedCount, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-secondary/10">
                  <MessageSquare className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {mockAssignments.reduce((acc, a) => acc + a.doubts.length, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Student Doubts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Pending Assignments
          </h2>
          
          <div className="space-y-3">
            {mockAssignments.filter(a => a.status === 'pending').map((assignment) => (
              <Card key={assignment.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                      <div className={`p-1.5 lg:p-2 rounded-full ${
                        assignment.status === 'submitted' ? 'bg-success/20' :
                        assignment.status === 'graded' ? 'bg-primary/20' :
                        'bg-warning/20'
                      }`}>
                        {assignment.status === 'submitted' ? (
                          <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-success" />
                        ) : assignment.status === 'graded' ? (
                          <Star className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                        ) : (
                          <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base lg:text-lg truncate">{assignment.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <Badge variant="secondary" className="text-xs w-fit">{assignment.subject}</Badge>
                          <span className="text-xs text-muted-foreground">{assignment.points} points</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={assignment.status === 'submitted' ? 'default' : 
                              assignment.status === 'graded' ? 'secondary' : 'destructive'}
                      className={`text-xs flex-shrink-0 ${
                        assignment.status === 'submitted' ? 'bg-success text-white' : 
                        assignment.status === 'graded' ? 'bg-primary text-white' : ''
                      }`}
                    >
                      {assignment.status === 'submitted' ? 'Submitted' :
                       assignment.status === 'graded' ? 'Graded' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 lg:space-y-4">
                  <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs lg:text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                      <span className={isOverdue(assignment.dueDate) ? 'text-destructive' : 'text-muted-foreground'}>
                        {isOverdue(assignment.dueDate) ? 'Overdue' : 'On time'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {assignment.status === 'pending' && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-gradient-primary text-xs lg:text-sm">
                            <Send className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                            Submit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Submit Assignment: {assignment.title}</DialogTitle>
                            <DialogDescription>
                              Submit your work for {assignment.title}. Make sure to review before submitting.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Enter your assignment submission here..."
                              value={submissionText}
                              onChange={(e) => setSubmissionText(e.target.value)}
                              className="min-h-[200px]"
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setSubmissionText('')}>
                                Cancel
                              </Button>
                              <Button 
                                onClick={() => handleSubmitAssignment(assignment.id)}
                                className="bg-gradient-primary"
                              >
                                Submit Assignment
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    
                    <Button size="sm" variant="outline" className="text-xs lg:text-sm">
                      <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Completed Assignments
          </h2>
          
          <div className="space-y-3">
            {mockAssignments.filter(a => a.status !== 'pending').map((assignment) => (
              <Card key={assignment.id} className="shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                      <div className={`p-1.5 lg:p-2 rounded-full ${
                        assignment.status === 'submitted' ? 'bg-success/20' :
                        assignment.status === 'graded' ? 'bg-primary/20' :
                        'bg-warning/20'
                      }`}>
                        {assignment.status === 'submitted' ? (
                          <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-success" />
                        ) : assignment.status === 'graded' ? (
                          <Star className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                        ) : (
                          <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base lg:text-lg truncate">{assignment.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <Badge variant="secondary" className="text-xs w-fit">{assignment.subject}</Badge>
                          <span className="text-xs text-muted-foreground">{assignment.points} points</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={assignment.status === 'submitted' ? 'default' : 
                              assignment.status === 'graded' ? 'secondary' : 'destructive'}
                      className={`text-xs flex-shrink-0 ${
                        assignment.status === 'submitted' ? 'bg-success text-white' : 
                        assignment.status === 'graded' ? 'bg-primary text-white' : ''
                      }`}
                    >
                      {assignment.status === 'submitted' ? 'Submitted' :
                       assignment.status === 'graded' ? 'Graded' : 'Pending'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 lg:space-y-4">
                  <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{assignment.description}</p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs lg:text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                      <span className={isOverdue(assignment.dueDate) ? 'text-destructive' : 'text-muted-foreground'}>
                        {isOverdue(assignment.dueDate) ? 'Overdue' : 'On time'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs lg:text-sm">
                      <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Manage assignments and student submissions</p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <ClipboardList className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Total Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-warning/10">
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockAssignments.filter(a => a.status === 'pending').length}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-success/10">
                <Users className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAssignments.reduce((acc, a) => acc + a.submittedCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <MessageSquare className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockAssignments.reduce((acc, a) => acc + a.doubts.length, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Student Doubts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {mockAssignments.map((assignment) => (
          <Card key={assignment.id} className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{assignment.title}</CardTitle>
                  <CardDescription>{assignment.subject} • Due: {assignment.dueDate}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">{assignment.description}</p>
                </div>
                <Badge className={getStatusColor(assignment.status)} variant="secondary">
                  {assignment.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <div className="text-lg font-semibold text-primary">{assignment.totalStudents}</div>
                  <div className="text-xs text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-success/5">
                  <div className="text-lg font-semibold text-success">{assignment.submittedCount}</div>
                  <div className="text-xs text-muted-foreground">Submitted</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-warning/5">
                  <div className="text-lg font-semibold text-warning">
                    {assignment.totalStudents - assignment.submittedCount}
                  </div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/5">
                  <div className="text-lg font-semibold text-secondary">{assignment.doubts.length}</div>
                  <div className="text-xs text-muted-foreground">Questions</div>
                </div>
              </div>

              <Progress 
                value={(assignment.submittedCount / assignment.totalStudents) * 100} 
                className="h-2"
              />

              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm" 
                  onClick={() => setSelectedAssignment(assignment)}
                  className="flex-1 min-w-[120px]"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Submissions ({assignment.submittedCount})
                </Button>

                <Button size="sm" variant="outline">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  Grade All
                </Button>
                
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Doubts ({assignment.doubts.filter(d => !d.answer).length})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
