import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Plus, 
  Search, 
  BookOpen, 
  ClipboardList, 
  Calendar,
  Settings,
  UserPlus,
  Copy,
  TrendingUp,
  Award
} from 'lucide-react';

const mockClassrooms = [
  {
    id: 1,
    name: "Advanced Mathematics",
    code: "MATH301",
    students: 25,
    assignments: 8,
    materials: 12,
    description: "Calculus and advanced mathematical concepts",
    color: "bg-primary"
  },
  {
    id: 2,
    name: "Physics Fundamentals", 
    code: "PHYS101",
    students: 18,
    assignments: 6,
    materials: 9,
    description: "Introduction to physics principles and mechanics",
    color: "bg-secondary"
  },
  {
    id: 3,
    name: "Chemistry Lab",
    code: "CHEM205",
    students: 15,
    assignments: 4,
    materials: 15,
    description: "Hands-on chemistry experiments and theory",
    color: "bg-accent"
  }
];

const recentStudents = [
  {
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    joinedDate: "2024-01-15"
  },
  {
    name: "James Brown",
    email: "james.brown@email.com", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    joinedDate: "2024-01-14"
  },
  {
    name: "Sophie Chen",
    email: "sophie.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    joinedDate: "2024-01-13"
  }
];

const Classrooms: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Classrooms</h1>
          <p className="text-muted-foreground">Manage your classes and student interactions</p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Classroom
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Active Classes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/10">
                <Users className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">58</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <ClipboardList className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-muted-foreground">Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-warning/10">
                <BookOpen className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">36</p>
                <p className="text-xs text-muted-foreground">Materials</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search classrooms..." className="pl-10" />
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClassrooms.map((classroom) => (
          <Card key={classroom.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-full ${classroom.color}/10`}>
                  <BookOpen className={`h-6 w-6 ${classroom.color.replace('bg-', 'text-')}`} />
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <CardTitle className="text-xl">{classroom.name}</CardTitle>
                <CardDescription>{classroom.description}</CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {classroom.code}
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-primary">{classroom.students}</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-secondary">{classroom.assignments}</div>
                  <div className="text-xs text-muted-foreground">Assignments</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-accent">{classroom.materials}</div>
                  <div className="text-xs text-muted-foreground">Materials</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Users className="h-4 w-4 mr-1" />
                  Manage
                </Button>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Student Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Student Activity
            </CardTitle>
            <CardDescription>Latest student joins and interactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentStudents.map((student, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="text-sm font-medium">{student.joinedDate}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Classroom Insights
            </CardTitle>
            <CardDescription>Performance and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5">
                <Award className="h-6 w-6 text-success" />
                <div>
                  <h4 className="font-medium">High Engagement</h4>
                  <p className="text-sm text-muted-foreground">
                    Mathematics class shows 95% assignment completion rate
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <h4 className="font-medium">Active Participation</h4>
                  <p className="text-sm text-muted-foreground">
                    Physics class has the most AI assistant interactions
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5">
                <BookOpen className="h-6 w-6 text-secondary" />
                <div>
                  <h4 className="font-medium">Material Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    Chemistry materials have 80% download rate
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Classroom Actions</CardTitle>
          <CardDescription>Common tasks to manage your classrooms effectively</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="flex items-center gap-3">
                <UserPlus className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Invite Students</p>
                  <p className="text-sm text-muted-foreground">Send class codes to new students</p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-secondary" />
                <div className="text-left">
                  <p className="font-medium">Create Assignment</p>
                  <p className="text-sm text-muted-foreground">Design new tasks for students</p>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="justify-start h-auto py-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium">View Analytics</p>
                  <p className="text-sm text-muted-foreground">Check student performance data</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Classrooms;