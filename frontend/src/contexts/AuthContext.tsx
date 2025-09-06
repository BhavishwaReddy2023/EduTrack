import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '@/types/auth';
import { mockLogin, generateMockJWT, saveJWT, getJWT, clearJWT, validateJWT } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing JWT on mount
    const jwt = getJWT();
    if (jwt) {
      const validatedUser = validateJWT(jwt.token);
      if (validatedUser) {
        setUser(validatedUser);
      } else {
        clearJWT();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'teacher'): Promise<boolean> => {
    try {
      setLoading(true);
      const authenticatedUser = await mockLogin(email, password, role);
      
      if (authenticatedUser) {
        const token = generateMockJWT(authenticatedUser);
        const jwt = {
          token,
          expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
          user: authenticatedUser
        };
        
        saveJWT(jwt);
        setUser(authenticatedUser);
        
        toast({
          title: "Welcome back!",
          description: `Logged in as ${authenticatedUser.role}`,
          className: "bg-success text-success-foreground",
        });
        
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid credentials or role mismatch",
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "Something went wrong. Please try again.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    clearJWT();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};