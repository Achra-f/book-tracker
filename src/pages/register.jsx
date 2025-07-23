import AuthForm from "../components/AuthForm.jsx";
import {SIGNUP_URL} from "../api/api.js";
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
          <PageTitle title="Signup - Book AI" />
          <AuthForm
              title={"Sign Up"}
              apiUrl={SIGNUP_URL}
              buttonText={"Sign Up"}
              text="Join us today and start your personalized book journey!"
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
                  navigate('/dashboard');
              }}
              renderFooter= {
                  <div className="flex">
                      <Link to="/login" className="link link-hover text-xs">
                          Already have an account?
                      </Link>
                  </div>
              }
          />
      </>
  )
}