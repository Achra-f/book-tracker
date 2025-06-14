import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Login success:', data);
        localStorage.setItem('token', data.token);
        navigate('/books');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={onSubmit}>
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <div className="form-control flex justify-between">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-control flex justify-between">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered"
              onChange={onChange}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
