import AuthForm from "../components/AuthForm.jsx";
import {LOGIN_URL} from "../api/api.js";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx";
import {useEffect} from "react";
import PageTitle from "../components/PageTitle.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  return (
      <>
          <PageTitle title="Login - Book AI" />
          <AuthForm
              title={"Log In"}
              apiUrl={LOGIN_URL}
              buttonText={"Log In"}
              text={"Welcome back! Please log in to access your account."}
              onSuccess={data => {
                  login(data.token);
                  navigate('/dashboard');
              }}
              renderFooter= {
                  <div className="flex justify-between flex-col sm:flex-row gap-2">
                      <Link to="/forgot" className="link link-hover text-xs">
                          Forgot password?
                      </Link>
                      <Link to="/signup" className="link link-hover text-xs">
                          No account?
                      </Link>
                  </div>
              }
          />
      </>
  )
}