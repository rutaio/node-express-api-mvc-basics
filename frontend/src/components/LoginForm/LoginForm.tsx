import './login-form.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

export const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="close-icon">
        <FontAwesomeIcon icon={faWindowClose} />
      </div>
      <div className="form-container">
        <h2>Login Form</h2>
        <form typeof="submit">
          <label className="label" htmlFor="username">
            Email or Phone
          </label>
          <input type="text" id="username" required />
          <label className="label" htmlFor="">
            Password
          </label>
          <input type="text" id="password" required />
          <button id="forgot-pwd-btn">Forgot Password?</button>
          <button id="login-btn">Login</button>
        </form>
      </div>
      <p className="non-users-cta">
        Not a member?{' '}
        <a href="#" className="cta-link">
          Signup now.
        </a>
      </p>
    </div>
  );
};
