import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import usignup from '../../imgs/usignup.jpg'
import { Link } from 'react-router-dom';
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    cPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignUp = () => {
 const signupForm = useFormik({
  initialValues: {
    name : '',
    email : '',
    password : '',
    cPassword : ''
  },
  onSubmit: async (values, {setSubmitting}) => {
    // setSubmitting(true);
    console.log(values);

    const res = await fetch('http://localhost:5000/expert/add' , {
      method: 'POST',
      body : JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(res.status);

    if(res.status === 200){

      Swal.fire({
        icon : 'success',
        tittle : 'Nice',
        text : 'You have successfully registered'
      })
    } else {
      Swal.fire({
        icon : 'error',
        tittle : 'opps!!',
        text : 'something went wrong'
      })
    }
    
  },
  validationSchema: SignupSchema
 });

  return (
    <div>
		<section className="vh-100 mt-2">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
		<div className='border border-dark rounded-3 p-2 '>
      <h2 className='text-center mb-4'>Create an account</h2>
    <form onSubmit={signupForm.handleSubmit}>
                <div className=" mb-2">
                <label className="form-label" htmlFor="form3Example1cg">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    values={signupForm.values.name}
                    onChange={signupForm.handleChange}
                
                    className="form-control form-control-lg"
                  />
                  <span className="text-danger">{signupForm.errors.name}</span>
                 
                </div>
                <div className=" mb-2">
                <label className="form-label" htmlFor="form3Example3cg">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    values={signupForm.values.email}
                    onChange={signupForm.handleChange}
                
                    className="form-control form-control-lg"
                  />
                          <span className="text-danger">{signupForm.errors.email}</span>
                </div>
                <div className=" mb-2">
                <label className="form-label" htmlFor="form3Example4cg">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    values={signupForm.values.password}
                    onChange={signupForm.handleChange}
                
                    className="form-control form-control-lg"
                  />
                          <span className="text-danger">{signupForm.errors.password}</span> 
                </div>
                <div className=" mb-2">
                <label className="form-label" htmlFor="form3Example4cdg">
                    Repeat your password
                  </label>
                  <input
                    type="password"
                    id="cPassword"
                    values={signupForm.values.cPassword}
                    onChange={signupForm.handleChange}
                
                    className="form-control form-control-lg"
                  />
                           <span className="text-danger">{signupForm.errors.cPassword}</span>
                </div>
                <div className="form-check d-flex justify-content-center mb-3">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    defaultValue=""
                    id="form2Example3cg"
                  />
                  <label className="form-check-label" htmlFor="form2Example3g">
                    I agree all statements in{" "}
                    <a href="#!" className="text-body">
                      <u>Terms of service</u>
                    </a>
                  </label>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn  btn-block btn-lg  text-body"
                    disabled={signupForm.isSubmitting}
                    style={{backgroundColor:"#19A7CE"}}
                  >
                    { signupForm.isSubmitting && <span className="spinner-border spinner-border-sm"></span>}
                &nbsp;&nbsp;
                    
                    Register
                  </button>
                  
                </div>
              {/* <Link to='/expert/Login'> */}
                <div className="d-flex justify-content-center">
              <button
                    type="submit"
                    className="btn  btn-block btn-lg  text-body"
                    disabled={signupForm.isSubmitting}
                    style={{backgroundColor:"#F0F0F0"}}
                  >
                  
                  Sign in
                  </button>
                </div>
              {/* </Link> */}
                
              </form>
    
		</div>
    
      </div>
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img
          src="https://chisellabs.com/blog/wp-content/uploads/2022/03/04.png"
          className="img-fluid"
          alt="Sample image"
        />
          
      </div>
     
      
    </div>
  </div>
 
</section>

	</div>
   
  )
}

export default SignUp
