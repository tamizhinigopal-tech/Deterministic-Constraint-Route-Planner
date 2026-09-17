import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Key, Mail, User } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration
    localStorage.setItem('token', 'mock-jwt-token');
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[var(--bg)]">
      <div className="card w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
            <UserPlus className="text-[var(--accent)]" size={32} /> DIGITAL DYNOS
          </h1>
          <p className="text-secondary mt-2">Create your AI Planner account</p>
        </div>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="text" 
                className="input-field w-full pl-10" 
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="email" 
                className="input-field w-full pl-10" 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input 
                type="password" 
                className="input-field w-full pl-10" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary mt-4 py-3">Create Account</button>
        </form>
        
        <div className="text-center mt-6 text-sm text-secondary">
          Already have an account? <Link to="/login" className="text-[var(--accent)] hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
