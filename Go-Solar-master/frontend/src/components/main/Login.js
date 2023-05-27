import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {

  const navigate = useNavigate();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      console.log(values);

      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body : JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(res.status === 200){

        const data = await res.json();

        if(data.role === 'admin'){
          sessionStorage.setItem('admin', JSON.stringify(data));
          navigate('/admin/manageequipment');
        }else{
          sessionStorage.setItem('user', JSON.stringify(data));
          navigate('/main/home');
        }


        Swal.fire({
          title : 'Well Done',
          icon : "success",
          text : "You have successfully logged in"
        })
      }else if(res.status === 401){
        Swal.fire({
          title : 'Oops',
          icon : "error",
          text : "Invalid Credentials"
        })
      }
    },
  });

  return (
    <section className="vh-100" style={{ backgroundColor: "#ffdc71" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={loginForm.handleSubmit}>
              {/* Email input */}
              <h1 className="text-center">Login Here</h1>
              <div className=" mb-4">
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email}
                  className="form-control form-control-lg"
                />
              </div>
              {/* Password input */}
              <div className=" mb-4">
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                  className="form-control form-control-lg"
                />
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* Checkbox */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="form1Example3"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
