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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
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
                <span className="text-sm">Joined {user.joinedAt}</span>
              </div>
              
              <Separator />
              
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Achievements */}
        <div className="lg:col-span-2 space-y-6">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                      <div className="text-2xl font-bold text-primary">3</div>
                      <div className="text-sm text-muted-foreground">Classrooms</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-secondary/5">
                      <div className="text-2xl font-bold text-secondary">87</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-accent/5">
                      <div className="text-2xl font-bold text-accent">15</div>
                      <div className="text-sm text-muted-foreground">Assignments</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-warning/5">
                      <div className="text-2xl font-bold text-warning">42</div>
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
                <Award className="h-5 w-5 text-accent" />
                Badges & Achievements
              </CardTitle>
              <CardDescription>Your earned accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.badges && stats.badges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-full bg-accent/10">
                        {badge === 'consistent' && <Target className="h-5 w-5 text-accent" />}
                        {badge === 'achiever' && <Trophy className="h-5 w-5 text-accent" />}
                        {badge === 'creator' && <BookOpen className="h-5 w-5 text-accent" />}
                        {badge === 'mentor' && <User className="h-5 w-5 text-accent" />}
                        {!['consistent', 'achiever', 'creator', 'mentor'].includes(badge) && 
                          <Star className="h-5 w-5 text-accent" />}
                      </div>
                      <div>
                        <h4 className="font-medium capitalize">{badge}</h4>
                        <p className="text-sm text-muted-foreground">
                          {badge === 'consistent' && 'Maintained learning streak'}
                          {badge === 'achiever' && 'High performance record'}
                          {badge === 'creator' && 'Content creation excellence'}
                          {badge === 'mentor' && 'Outstanding teaching'}
                          {!['consistent', 'achiever', 'creator', 'mentor'].includes(badge) && 
                            'Special achievement earned'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-medium mb-2">No badges yet</h4>
                  <p className="text-sm text-muted-foreground">
                    {isStudent 
                      ? "Complete assignments and maintain streaks to earn badges!" 
                      : "Create engaging content and help students to earn recognition!"}
                  </p>
                </div>
              )}
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