import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/image_1_1774189292507-removebg-preview.png'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const user = data.user;

    // Fetch role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      return;
    }

    // Redirect based on role
    if (profile.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/learner');
    }
  };

  return (
    <div className="login-container flex align-center">
      <div className="login-header">
        <img src={logo} alt="logo" className="login-logo" />
        <h2 className="login-title">CheckIn Hub</h2>
        <p className="login-subtitle">
          Attendance verification for training venues
        </p>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">
          Login
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}