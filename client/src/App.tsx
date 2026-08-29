import React, { useState, useEffect } from 'react';
import { CRMApp } from './crm/CRMApp';
import { LoginView } from './crm/auth/LoginView';
import { RegisterView } from './crm/auth/RegisterView';
import { ForgotPasswordView } from './crm/auth/ForgotPasswordView';
import { CRMApiClient } from './crm/services/crmApiClient';

export function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authView, setAuthView] = useState<'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD'>('LOGIN');
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    try {
      const token = CRMApiClient.getAuthToken();
      if (token) {
        const res = await CRMApiClient.getCurrentUser();
        if (res.success && res.user) {
          setCurrentUser(res.user);
        } else {
          CRMApiClient.setAuthToken('');
          setCurrentUser(null);
        }
      } else {
        // Default to logged-in Strategic Account Executive for seamless initial experience
        const defaultLogin = await CRMApiClient.login('rep@apexcore.example.com', 'Password123!');
        if (defaultLogin.success && defaultLogin.user) {
          setCurrentUser(defaultLogin.user);
        }
      }
    } catch (err) {
      console.error('Session validation error:', err);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogout = async () => {
    await CRMApiClient.logout();
    setCurrentUser(null);
    setAuthView('LOGIN');
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-mono">
        Initializing ApexCore Enterprise CRM...
      </div>
    );
  }

  if (!currentUser) {
    if (authView === 'REGISTER') {
      return (
        <RegisterView
          onRegisterSuccess={(user) => setCurrentUser(user)}
          onNavigateToLogin={() => setAuthView('LOGIN')}
        />
      );
    }

    if (authView === 'FORGOT_PASSWORD') {
      return (
        <ForgotPasswordView
          onNavigateToLogin={() => setAuthView('LOGIN')}
        />
      );
    }

    return (
      <LoginView
        onLoginSuccess={(user) => setCurrentUser(user)}
        onNavigateToRegister={() => setAuthView('REGISTER')}
        onNavigateToForgotPassword={() => setAuthView('FORGOT_PASSWORD')}
      />
    );
  }

  return (
    <CRMApp
      currentUser={currentUser}
      onLogout={handleLogout}
    />
  );
}

export default App;
