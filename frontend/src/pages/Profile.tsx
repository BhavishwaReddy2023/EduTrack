import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  TrendingUp, 
  BookOpen, 
  ClipboardList,
  Edit,
  Star,
  Trophy,
  Target
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const stats = user.stats;
  const isStudent = user.role === 'student';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your achievements</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* Profile Card */}
        <div className="xl:col-span-1">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Badge variant={isStudent ? "default" : "secondary"} className="capitalize">
                  {user.role}
                </Badge>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
              </div>
              
              {/* Role-specific information */}
              {user.role === 'student' && user.studentId && (
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ID: {user.studentId}</span>
                </div>
              )}
              
              {user.role === 'student' && user.grade && (
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Grade: {user.grade}</span>
                </div>
              )}
              
              {user.role === 'teacher' && user.department && (
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Department: {user.department}</span>
                </div>
              )}
              
              {user.role === 'teacher' && user.qualification && (
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.qualification}</span>
                </div>
              )}
              
              <Separator />
              
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Achievements */}
        <div className="xl:col-span-2 space-y-4 lg:space-y-6">
          {/* Performance Stats */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Performance Statistics
              </CardTitle>
              <CardDescription>Your academic progress and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {isStudent ? (
                  <>
                    <div className="text-center p-4 rounded-lg bg-primary/5">
                      <div className="text-2xl font-bold text-primary">
                        {stats?.totalAssignments || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Assignments</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-success/5">
                      <div className="text-2xl font-bold text-success">
                        {stats?.completedAssignments || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-secondary/5">
                      <div className="text-2xl font-bold text-secondary">
                        {stats?.averageScore || 0}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Score</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-accent/5">
                      <div className="text-2xl font-bold text-accent">
                        #{stats?.rank || '-'}
                      </div>
                      <div className="text-sm text-muted-foreground">Class Rank</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center p-4 rounded-lg bg-primary/5">
                      <div className="text-2xl font-bold text-primary">
                        {stats?.totalClassrooms || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Classrooms</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-secondary/5">
                      <div className="text-2xl font-bold text-secondary">
                        {stats?.totalStudents || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-accent/5">
                      <div className="text-2xl font-bold text-accent">
                        {stats?.totalAssignments || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Assignments</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-warning/5">
                      <div className="text-2xl font-bold text-warning">
                        {stats?.totalMaterials || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">Materials</div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Badges and Achievements */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Badges & Achievements
              </CardTitle>
              <CardDescription>Your earned accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Consistent Learner Badge */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                  <div className="p-2 rounded-full bg-yellow-500/20">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">Consistent Learner</p>
                    <p className="text-sm text-yellow-600">Maintained 7-day study streak</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">New</Badge>
                </div>

                {/* Mathematics Master Badge */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">Mathematics Master</p>
                    <p className="text-sm text-blue-600">Scored 95% in Mathematics Quiz</p>
                  </div>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">3 days ago</Badge>
                </div>

                {/* Assignment Ace Badge */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <div className="p-2 rounded-full bg-green-500/20">
                    <ClipboardList className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-green-800">Assignment Ace</p>
                    <p className="text-sm text-green-600">Completed 5 assignments on time</p>
                  </div>
                  <Badge variant="outline" className="border-green-200 text-green-700">1 week ago</Badge>
                </div>

                {/* Material Explorer Badge */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-purple-800">Material Explorer</p>
                    <p className="text-sm text-purple-600">Downloaded 10+ study materials</p>
                  </div>
                  <Badge variant="outline" className="border-purple-200 text-purple-700">2 weeks ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest actions and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-success/10">
                    <Trophy className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium">Achievement unlocked</p>
                    <p className="text-sm text-muted-foreground">Earned "Consistent Learner" badge</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <ClipboardList className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Assignment completed</p>
                    <p className="text-sm text-muted-foreground">Mathematics Quiz - Score: 95%</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <BookOpen className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">Material accessed</p>
                    <p className="text-sm text-muted-foreground">Downloaded "Introduction to Calculus"</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-auto">5 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;