import AuthForm from "../components/AuthForm.jsx";
import {SIGNUP_URL} from "../api.js";
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
          title={"Sign Up"}
          apiUrl={SIGNUP_URL}
          buttonText={"Sign Up"}
          extraFields={[
            {
              name: "confirmPassword",
              type: "password",
              label: "Confirm Password",
              placeholder: "••••••••",
            }
          ]}
          onSuccess={data => {
            login(data);
            navigate('/books');
          }}
          renderFooter= {
            <div className="flex">
              <Link to="/login" className="link link-hover text-xs">
                Already have an account?
              </Link>
            </div>
          }
      />
  )
}