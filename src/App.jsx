import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Books from './pages/Books.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  );
}
