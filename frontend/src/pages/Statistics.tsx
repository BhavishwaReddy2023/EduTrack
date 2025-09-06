import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Trophy,
  BarChart3,
  Clock,
  Flame,
  Award
} from 'lucide-react';

const Statistics: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Statistics</h1>
        <p className="text-muted-foreground">Track your academic progress and performance metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <Flame className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">5 days</div>
            <p className="text-xs text-muted-foreground">Current streak</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">87%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">42h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Trophy className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">#3</div>
            <p className="text-xs text-muted-foreground">Out of 28 students</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Subject Performance
            </CardTitle>
            <CardDescription>Your grades across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm text-success font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Physics</span>
                  <span className="text-sm text-success font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Chemistry</span>
                  <span className="text-sm text-warning font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">History</span>
                  <span className="text-sm text-success font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment Progress */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Assignment Progress
            </CardTitle>
            <CardDescription>Completion status of your assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">83%</div>
                <p className="text-sm text-muted-foreground">Overall Completion Rate</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completed</span>
                  <span className="text-sm font-medium text-success">10/12</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">In Progress</span>
                  <span className="text-sm font-medium text-warning">2/12</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Score</span>
                  <span className="text-sm font-medium text-primary">87%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your learning activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const values = [80, 65, 90, 75, 85, 45, 60];
                return (
                  <div key={day}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{day}</span>
                      <span className="text-sm text-muted-foreground">{values[index]}min</span>
                    </div>
                    <Progress value={values[index]} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Your latest milestones and badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5">
                <Trophy className="h-8 w-8 text-success" />
                <div>
                  <h4 className="font-medium">Perfect Score</h4>
                  <p className="text-sm text-muted-foreground">
                    Achieved 100% on Mathematics Quiz
                  </p>
                </div>
                <Badge variant="secondary" className="ml-auto">New</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                <Flame className="h-8 w-8 text-accent" />
                <div>
                  <h4 className="font-medium">5-Day Streak</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintained daily learning streak
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5">
                <Target className="h-8 w-8 text-secondary" />
                <div>
                  <h4 className="font-medium">Assignment Master</h4>
                  <p className="text-sm text-muted-foreground">
                    Completed 10 assignments this month
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>AI-powered analysis of your learning patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">Strength</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You excel in mathematical problem-solving and consistently perform above average in quantitative subjects.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/5">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-warning" />
                <span className="font-medium text-warning">Opportunity</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Consider spending more time on chemistry concepts. Practice problems could help improve your understanding.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Recommendation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your peak learning hours are between 9-11 AM. Schedule difficult subjects during this time for better retention.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;