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
    dueDate: "2024-02-15",
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
    dueDate: "2024-02-10",
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
    title: "Chemistry Quiz",
    subject: "Chemistry",
    dueDate: "2024-02-20",
    status: "pending",
    difficulty: "Easy",
    points: 50,
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
    title: "Historical Essay",
    subject: "History",
    dueDate: "2024-01-30",
    status: "graded",
    difficulty: "Medium",
    points: 100,
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'submitted':
      return 'bg-primary text-primary-foreground';
    case 'graded':
      return 'bg-success text-success-foreground';
    case 'overdue':
      return 'bg-destructive text-destructive-foreground';
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
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [newDoubtAnswer, setNewDoubtAnswer] = useState('');
  const [scoreInput, setScoreInput] = useState('');

  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const completedAssignments = mockAssignments.filter(a => a.status !== 'pending');

  const handleScoreAssignment = (submissionId: number, score: number) => {
    // Mock score assignment - in real app, this would update the backend
    console.log(`Assigning score ${score} to submission ${submissionId}`);
  };

  const handleAnswerDoubt = (doubtId: number, answer: string) => {
    // Mock doubt answering - in real app, this would update the backend
    console.log(`Answering doubt ${doubtId}: ${answer}`);
    setNewDoubtAnswer('');
  };

  // Student view (existing functionality)
  if (user?.role === 'student') {
    return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Track your assignments and submissions</p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-warning/10">
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-success/10">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedAssignments.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Calendar className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Due Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Assignments */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          Pending Assignments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingAssignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.subject}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(assignment.status)} variant="secondary">
                    {assignment.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge className={getDifficultyColor(assignment.difficulty)} variant="outline">
                    {assignment.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {assignment.points} points
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Due: {assignment.dueDate}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Send className="h-4 w-4 mr-1" />
                    Submit
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Assignments */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-success" />
          Completed Assignments
        </h2>
        
        <div className="space-y-3">
          {completedAssignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-success/10">
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {assignment.score && (
                      <div className="text-right">
                        <p className="font-medium text-success">
                          {assignment.score}/{assignment.points}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round((assignment.score / assignment.points) * 100)}%
                        </p>
                      </div>
                    )}
                    <Badge className={getStatusColor(assignment.status)} variant="secondary">
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
                
                {assignment.score && (
                  <div className="mt-4">
                    <Progress 
                      value={(assignment.score / assignment.points) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    );
  }

  // Teacher view (enhanced functionality)
  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats Overview */}
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
                <p className="text-2xl font-bold">{pendingAssignments.length}</p>
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

      {/* Assignments List */}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedAssignment(assignment)}
                      className="flex-1 min-w-[120px]"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Submissions ({assignment.submittedCount})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{assignment.title} - Submissions</DialogTitle>
                      <DialogDescription>
                        Review and grade student submissions
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="submissions" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="submissions">Submissions</TabsTrigger>
                        <TabsTrigger value="doubts">
                          Student Doubts ({assignment.doubts.length})
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="submissions" className="space-y-4">
                        {assignment.submissions.map((submission) => (
                          <Card key={submission.id} className="shadow-card">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                      {submission.studentName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium">{submission.studentName}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Submitted: {submission.submittedAt}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {submission.score !== null ? (
                                    <Badge variant="secondary" className="bg-success/10 text-success">
                                      {submission.score}/{assignment.points}
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Not Graded</Badge>
                                  )}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="p-3 rounded-lg bg-muted/30">
                                <p className="text-sm">{submission.content}</p>
                              </div>
                              
                              {submission.score === null && (
                                <div className="flex gap-2">
                                  <Input
                                    type="number"
                                    placeholder={`Score (0-${assignment.points})`}
                                    className="flex-1"
                                    value={scoreInput}
                                    onChange={(e) => setScoreInput(e.target.value)}
                                    max={assignment.points}
                                    min={0}
                                  />
                                  <Button 
                                    size="sm"
                                    onClick={() => {
                                      if (scoreInput) {
                                        handleScoreAssignment(submission.id, parseInt(scoreInput));
                                        setScoreInput('');
                                      }
                                    }}
                                  >
                                    <Star className="h-4 w-4 mr-1" />
                                    Grade
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="doubts" className="space-y-4">
                        {assignment.doubts.map((doubt) => (
                          <Card key={doubt.id} className="shadow-card">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                      {doubt.studentName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium">{doubt.studentName}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Asked: {doubt.timestamp}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant={doubt.answer ? "secondary" : "outline"}>
                                  {doubt.answer ? "Answered" : "Pending"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="p-3 rounded-lg bg-muted/30">
                                <p className="text-sm font-medium text-primary">Question:</p>
                                <p className="text-sm mt-1">{doubt.question}</p>
                              </div>
                              
                              {doubt.answer ? (
                                <div className="p-3 rounded-lg bg-success/5">
                                  <p className="text-sm font-medium text-success">Your Answer:</p>
                                  <p className="text-sm mt-1">{doubt.answer}</p>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <Textarea
                                    placeholder="Type your answer here..."
                                    value={newDoubtAnswer}
                                    onChange={(e) => setNewDoubtAnswer(e.target.value)}
                                  />
                                  <Button 
                                    size="sm"
                                    onClick={() => handleAnswerDoubt(doubt.id, newDoubtAnswer)}
                                    disabled={!newDoubtAnswer.trim()}
                                  >
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    Answer
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>

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