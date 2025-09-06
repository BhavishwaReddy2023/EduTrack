import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  FileText,
  Video,
  Link,
  Plus,
  Bot
} from 'lucide-react';

const mockMaterials = [
  {
    id: 1,
    title: "Introduction to Calculus",
    type: "PDF",
    classroom: "Mathematics",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    description: "Comprehensive guide covering basic calculus concepts and derivatives"
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    type: "Video",
    classroom: "Physics",
    uploadDate: "2024-01-14",
    size: "45 MB",
    description: "Video lecture on Newton's laws and motion principles"
  },
  {
    id: 3,
    title: "Chemistry Lab Guidelines",
    type: "PDF",
    classroom: "Chemistry",
    uploadDate: "2024-01-13",
    size: "1.8 MB",
    description: "Safety protocols and experiment procedures for laboratory work"
  },
  {
    id: 4,
    title: "History Timeline",
    type: "Link",
    classroom: "History",
    uploadDate: "2024-01-12",
    size: "-",
    description: "Interactive timeline of major historical events"
  }
];

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="h-5 w-5 text-red-500" />;
    case 'video':
      return <Video className="h-5 w-5 text-blue-500" />;
    case 'link':
      return <Link className="h-5 w-5 text-green-500" />;
    default:
      return <BookOpen className="h-5 w-5 text-gray-500" />;
  }
};

const Materials: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Learning Materials</h1>
          <p className="text-muted-foreground">Access your study resources and course materials</p>
        </div>
        
        <Button className="bg-gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          Upload Material
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search materials..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="cursor-pointer">All Materials</Badge>
        <Badge variant="outline" className="cursor-pointer">Mathematics</Badge>
        <Badge variant="outline" className="cursor-pointer">Physics</Badge>
        <Badge variant="outline" className="cursor-pointer">Chemistry</Badge>
        <Badge variant="outline" className="cursor-pointer">History</Badge>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMaterials.map((material) => (
          <Card key={material.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(material.type)}
                  <div>
                    <CardTitle className="text-base">{material.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {material.classroom} • {material.uploadDate}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {material.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {material.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Size: {material.size}</span>
                <span>Added {material.uploadDate}</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Bot className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Summary Feature */}
      <Card className="shadow-card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Material Summary
          </CardTitle>
          <CardDescription>
            Get AI-powered summaries and key insights from your learning materials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-gradient-primary">
            Generate Summary for Selected Materials
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Materials;