import AuthForm from "../components/AuthForm.jsx";
import {LOGIN_URL} from "../api/api.js";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx";
import {useEffect} from "react";

export default function Register() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) navigate('/books');
  }, [isLoggedIn, navigate]);

  return (
      <AuthForm
          title={"Log In"}
          apiUrl={LOGIN_URL}
          buttonText={"Log In"}
          onSuccess={data => {
            login(data.token);
            navigate('/books');
          }}
          renderFooter= {
            <div className="flex justify-between flex-col sm:flex-row gap-2">
              <Link href="/forgot" className="link link-hover text-xs">
                Forgot password?
              </Link>
              <Link to="/signup" className="link link-hover text-xs">
                No account?
              </Link>
            </div>
          }
      />
  )
}