import "./Login.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { login, signup } from "../../firebase";
import netflix_spinner from '../../assets/netflix_spinner.gif'
import netflix_login_background from '../../assets/netflix_login_background.jpg'

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault()
    setLoading(true);
    if (signState === 'Sign In') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }


  return (
    loading ? <div className="login__spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
      <div className="login" style={{ backgroundImage: `linear-gradient(#0000007e, #0000007e), url(${netflix_login_background})` }}>
        <img src={logo} className="login__logo" alt="" />
        <div className="login__form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" ? (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            ) : (
              <></>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={user_auth} type='submit'>{signState}</button>
            <div className="form__help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form__switch">
            {signState === "Sign In" ? (
              <p>
                New to Netflix?{" "}
                <span
                  onClick={() => {
                    setSignState("Sign Up");
                  }}
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setSignState("Sign In");
                  }}
                >
                  Sign In
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Login;
