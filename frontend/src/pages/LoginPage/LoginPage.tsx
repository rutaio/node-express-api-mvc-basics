import './login-page.css';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const LoginPage = () => {
  // todo: hide navigation, when this page loads..

  return (
    <>
      <div className="container">
        <LoginForm />
      </div>
    </>
  );
};
