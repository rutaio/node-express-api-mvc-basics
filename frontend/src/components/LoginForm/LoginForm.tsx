export const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="close-icon-container">
        <span>x</span>
      </div>
      <div className="form-container">
        <h2>Login Form</h2>
        <form typeof="submit">
          <label htmlFor="username">Email or Phone</label>
          <input type="text" id="username" required />
          <label htmlFor="">Password</label>
          <input type="text" id="password" required />
          <button id="forgot-pwd-btn">Forgot password</button>
          <button id="login-btn">Login</button>
        </form>
      </div>
      <div className="non-users-container">
        <span>
          Not a member? <a href="#">Signup now.</a>
        </span>
      </div>
    </div>
  );
};
