import React, { useState } from 'react';
import { CRMApiClient } from '../services/crmApiClient';
import { Briefcase, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: any) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateToForgotPassword
}) => {
  const [email, setEmail] = useState('rep@apexcore.example.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await CRMApiClient.login(email, password);
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Login failed. Check credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRoleLogin = async (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Password123!');
    setError('');
    setLoading(true);

    try {
      const res = await CRMApiClient.login(roleEmail, 'Password123!');
      if (res.success && res.user) {
        onLoginSuccess(res.user);
      } else {
        setError(res.error || 'Role login failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const demoRoles = [
    { role: 'Admin', name: 'Alexandra Sterling', email: 'admin@apexcore.example.com', badge: 'bg-rose-500/20 text-rose-300' },
    { role: 'Sales Manager', name: 'Jonathan Holloway', email: 'manager@apexcore.example.com', badge: 'bg-indigo-500/20 text-indigo-300' },
    { role: 'Sales Representative', name: 'Marcus Vance', email: 'rep@apexcore.example.com', badge: 'bg-emerald-500/20 text-emerald-300' },
    { role: 'Support Agent', name: 'Sarah Jenkins', email: 'support@apexcore.example.com', badge: 'bg-cyan-500/20 text-cyan-300' },
    { role: 'Marketing Executive', name: 'Elena Rostova', email: 'marketing@apexcore.example.com', badge: 'bg-amber-500/20 text-amber-300' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 items-center justify-center shadow-lg shadow-indigo-500/30">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">ApexCore CRM</h1>
          <p className="text-xs text-slate-400">Enterprise Revenue Operations & Customer Management OS</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-base font-bold text-white">Sign In to Workstation</h2>
            <p className="text-xs text-slate-400 mt-0.5">Enter your enterprise credentials or select a demo role.</p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={onNavigateToForgotPassword}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to CRM Workstation'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Demo Role One-Click Switcher */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              ⚡ 1-Click Role Switcher Demo
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {demoRoles.map(dr => (
                <button
                  key={dr.role}
                  type="button"
                  onClick={() => handleQuickRoleLogin(dr.email)}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 text-left transition"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">{dr.name}</span>
                    <span className="text-[10px] text-slate-400">{dr.email}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${dr.badge}`}>
                    {dr.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="text-indigo-400 hover:text-indigo-300 font-bold ml-1"
            >
              Register User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
