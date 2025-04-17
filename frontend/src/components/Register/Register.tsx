import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import { AuthContext } from '../../context/AuthContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register } = useContext(AuthContext);

  const validateForm = () => {
    // nuresettinam:
    setPasswordError('');

    // Patikriname ar slaptazodziai sutampa:
    if (password !== confirmPassword) {
      setPasswordError('Slaptazodziai nesutampa');
      return false;
    }

    // tikriname ar slaptazodis yra bent sesiu simboliu ilgio:
    if (password.length < 6) {
      setPasswordError('Slaptazodis yra per trumpas');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await register(name, email, password);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Registracija</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Pilnas Vardas ir Pavarde</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">El.pastas</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Slaptazodis</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Pakartokite Slaptazodi</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordError && <p className="field-error">{passwordError}</p>}
          </div>

          <button type="submit" className="register-button">
            {'Registruotis'}
          </button>
        </form>

        <div className="login-link">
          Ar jau turite paskyra? <Link to="/login">Prisijunkite</Link>
        </div>
      </div>
    </div>
  );
};
