import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBTextArea
}
  from 'mdb-react-ui-kit';
import ContactImg from '../../imgs/contactImg.svg'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const Contacts = () => {
  const Contact = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: ""
    },
    onSubmit: async (values, { setSubmitting }) => {

      console.log(values);


      const res = await fetch('http://localhost:5000/contact/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(res.status);

      if (res.status === 200) {

        Swal.fire({
          icon: 'success',
          title: 'Nice',
          text: 'You have successfully registered'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'opps!!',
          text: 'something went worng'
        })
      }

    },
    // validationSchema: SignupSchema
  });






  return (<>
    
    <div className="text-center" >
      <h5 className=" display-4 fw-bold ls-tight px-3" style={{ color: '#E5CBE8 ' }}>
        Have Some Question? <br />
        {/* <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span> */}
      </h5>
      <p className='px-3 text-center' style={{ color: 'hsl(218, 81%, 85%)' }}>
        Thank you for your interest in out services. Please fill out the form below<br /> and we will get back yo you promptly regarding your request.
      </p>
    </div>
    <MDBContainer fluid className=' background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <img src={ContactImg} alt="" className=' justify-content-center' height="350px" />
          <div className="me-5 d-none d-lg-block justify-content-center">

            <h4>Get In Touch</h4>
            <hr />
            <div className=" pr-5 ">
              <span className=''><i class="fa-solid fa-phone me-5"   >&nbsp;&nbsp;&nbsp;</i>+91 3678467834</span> <br />
              <span className=''><i class="fa-solid fa-envelope  me-5">&nbsp;&nbsp;&nbsp; </i>hello@demo.com  </span>  <br />
              <i class="fa-sharp fa-solid fa-location-dot me-5">&nbsp;&nbsp;&nbsp;</i>931 Abia Martin Drive, PA Pennsylania-62465
            </div>
          </div>

        </MDBCol>
        <MDBCol md='6' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-1 bg-glass'>
            <MDBCardBody className='p-5'>
              <form onSubmit={Contact.handleSubmit}>



                <MDBInput wrapperClass='mb-4' label='Name' id='name' values={Contact.values.name} onChange={Contact.handleChange} type='text' />
                <MDBInput wrapperClass='mb-4' label='Phone' id='phone' values="Contact.values.phone" onChange={Contact.handleChange} type='tel' />
                <MDBInput wrapperClass='mb-4' label='Email' id='email' values="Contact.values.email" onChange={Contact.handleChange} type='email' />
                <MDBInput wrapperClass='mb-4' label='Subject' id='subject' values="Contact.values.subject" onChange={Contact.handleChange} type='text' />
                <MDBTextArea wrapperClass='mb-4' label='Message' id='message' values="Contact.values.message" onChange={Contact.handleChange} rows={4} />

                {/* <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div> */}

                <button type='submit' className=" btn mt-2 mb-2 px-5 btn-success btn-lg btn-block" >SEND MESSAGE</button>



              </form>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
   
  </>
  );
}

export default Contacts;
// export default Contacts