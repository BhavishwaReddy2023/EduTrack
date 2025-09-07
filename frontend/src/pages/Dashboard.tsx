import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import UploadMaterialModal from '@/components/modals/UploadMaterialModal';
import ManageClassroomsModal from '@/components/modals/ManageClassroomsModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, 
  ClipboardList, 
  Trophy, 
  TrendingUp, 
  Users, 
  Calendar,
  Star,
  Award,
  Target,
  CheckCircle,
  Loader2
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = user?.stats;

  const completionRate = stats ? Math.round((stats.completedAssignments! / stats.totalAssignments!) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-4 lg:p-6 text-white shadow-elevated">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-white/90 text-sm lg:text-base">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold">{stats?.streak || 0}</div>
              <div className="text-xs lg:text-sm text-white/80">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold">#{stats?.rank || '-'}</div>
              <div className="text-xs lg:text-sm text-white/80">Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalAssignments || 0}</div>
            <p className="text-xs text-muted-foreground">Assigned to you</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats?.completedAssignments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.averageScore || 0}%</div>
            <p className="text-xs text-muted-foreground">Across all assignments</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.badges?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Earned achievements</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Progress Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Progress Overview
            </CardTitle>
            <CardDescription>Your learning progress this semester</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Assignment Completion</span>
                <span className="text-sm text-muted-foreground">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Average Performance</span>
                <span className="text-sm text-muted-foreground">{stats?.averageScore || 0}%</span>
              </div>
              <Progress value={stats?.averageScore || 0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
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
                  <CheckCircle className="h-5 w-5 text-green-600" />
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
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump to your most important tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="justify-start h-auto py-4"
              onClick={() => navigate('/materials')}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Browse Materials</p>
                  <p className="text-sm text-muted-foreground">Access study resources</p>
                </div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-4"
              onClick={() => navigate('/assignments')}
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-secondary" />
                <div className="text-left">
                  <p className="font-medium">View Assignments</p>
                  <p className="text-sm text-muted-foreground">Check pending tasks</p>
                </div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-4"
              onClick={() => navigate('/performance')}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <p className="font-medium">View Statistics</p>
                  <p className="text-sm text-muted-foreground">Track your progress</p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [statsResponse, activityResponse] = await Promise.all([
          apiService.getDashboardStats(),
          apiService.getRecentActivity()
        ]);

        if (statsResponse.success) {
          setStats(statsResponse.data);
        } else {
          console.error('Failed to fetch stats:', statsResponse.error);
        }

        if (activityResponse.success) {
          setRecentActivity(activityResponse.data || []);
        } else {
          console.error('Failed to fetch recent activity:', activityResponse.error);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-secondary rounded-xl p-6 text-white shadow-elevated">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Good day, {user?.name}! 👨‍🏫</h1>
            <p className="text-white/90">Manage your classes and inspire learning</p>
          </div>
          <Avatar className="h-16 w-16 border-4 border-white/20">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classrooms</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeClassrooms || 0}</div>
            <p className="text-xs text-muted-foreground">Currently teaching</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.totalStudents || 0}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments Created</CardTitle>
            <ClipboardList className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats?.totalAssignments || 0}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materials Uploaded</CardTitle>
            <BookOpen className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats?.totalMaterials || 0}</div>
            <p className="text-xs text-muted-foreground">Resources shared</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest classroom updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'assignment' ? 'bg-success/10' :
                    activity.type === 'material' ? 'bg-primary/10' :
                    activity.type === 'student' ? 'bg-secondary/10' :
                    'bg-muted/10'
                  }`}>
                    {activity.type === 'assignment' && <CheckCircle className="h-4 w-4 text-success" />}
                    {activity.type === 'material' && <BookOpen className="h-4 w-4 text-primary" />}
                    {activity.type === 'student' && <Users className="h-4 w-4 text-secondary" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Teacher Tools</CardTitle>
            <CardDescription>Quick access to your teaching resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start gap-3 h-12 bg-gradient-primary"
                onClick={() => navigate('/assignments')}
              >
                <ClipboardList className="h-5 w-5" />
                Create New Assignment
              </Button>
              
              <UploadMaterialModal onUploadSuccess={() => {
                // Refresh dashboard data after successful upload
                const refreshData = async () => {
                  try {
                    const [statsResponse, activityResponse] = await Promise.all([
                      apiService.getDashboardStats(),
                      apiService.getRecentActivity()
                    ]);
                    if (statsResponse.success) setStats(statsResponse.data);
                    if (activityResponse.success) setRecentActivity(activityResponse.data || []);
                  } catch (error) {
                    console.error('Error refreshing dashboard:', error);
                  }
                };
                refreshData();
              }}>
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Upload Learning Material
                </Button>
              </UploadMaterialModal>
              
              <ManageClassroomsModal>
                <Button variant="outline" className="w-full justify-start gap-3 h-12">
                  <Users className="h-5 w-5 text-secondary" />
                  Manage Classrooms
                </Button>
              </ManageClassroomsModal>
              
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <TrendingUp className="h-5 w-5 text-accent" />
                View Student Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (user?.role === 'student') {
    return <StudentDashboard />;
  }

  if (user?.role === 'teacher') {
    return <TeacherDashboard />;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-muted-foreground">Loading dashboard...</p>
    </div>
  );
};

export default Dashboard;