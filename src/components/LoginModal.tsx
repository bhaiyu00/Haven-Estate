import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  onLogin: (user: { name: string; email: string }) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = email.trim() || 'arjun.mehra@example.com';
    const userName = name.trim() || (userEmail.split('@')[0]);
    onLogin({ name: userName, email: userEmail });
    onClose();
  };

  const handleQuickDemo = () => {
    onLogin({ name: 'Nishant Barman', email: 'nishant.barman@havenestates.com' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-900 border border-neutral-200">
              <User className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900">
              Welcome back, {currentUser.name}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Signed in as {currentUser.email}
            </p>

            <div className="space-y-3">
              <button
                onClick={onLogout}
                className="w-full py-2.5 px-4 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase mb-1">
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                <span>Verified Client Portal</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-neutral-900">
                {mode === 'signin' ? 'Sign In to Haven' : 'Create Your Account'}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Save shortlisted properties, book discreet viewings, and track direct inquiries.
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="inline-flex w-full p-1 bg-neutral-100 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  mode === 'signin' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  mode === 'signup' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nishant Barman"
                      className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nishant@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 focus:outline-none focus:border-neutral-900 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-neutral-150 text-center">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-xs font-medium text-neutral-600 hover:text-neutral-900 underline underline-offset-2 cursor-pointer"
              >
                Continue instantly with Demo Account
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
