import React, { useState } from 'react'
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,


  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  
  MDBIcon,
  MDBTextArea,

}
  from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import app_config from '../../config';
import { toast}  from 'react-hot-toast';

// import MDBFileupload from 'mdb-react-fileupload';
const AddEquipment = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('admin')));

    const [selImage, setSelImage] = useState('');
  
    const {apiUrl} = app_config;
  
    const uploadImage = async (e) => {
      const file = e.target.files[0];
      setSelImage(file);
      const fd = new FormData();
      fd.append("myfile", file);
      fetch(apiUrl + "/util/uploadfile", {
        method: "POST",
        body: fd,
      }).then((res) => {
        if (res.status === 200) {
          console.log("file uploaded");
          toast.success("File Uploaded!!");
        }
      });
    }
  const addequipmentForm = useFormik({
    initialValues: {
      title : '',
      description : '',
      price : '',
      seller : currentUser._id,
      category : '',
      image : '',
      createdAt: new Date()
    },
    onSubmit: async (values, {setSubmitting}) => { 
      // setSubmitting(true);
      values.image = selImage.name;
      console.log(values);
  
      const res = await fetch('http://localhost:5000/equipment/add',{
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
          title : 'Nice',
          text : 'You have successfully registered'
        })
      } else {
        Swal.fire({
          icon : 'error',
          title : 'opps!!',
          text : 'something went worng'
        })
      }
      
    },
  
   });
 

  return (
    <MDBContainer className="my-5" >
      {/* <h2>Add New Equipment</h2> */}
      <MDBCard >
        <MDBRow className='g-0' >

          <MDBCol md='6'>
            <div>
              {/* <h1>Upload and Display Image usign React Hook's</h1> */}

              {selectedImage && (
                <div>
                  <img
                    alt="not found"
                    width={"500px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
              )}

              <br />
              <br />

                <label htmlFor='upload-image' className="btn btn-primary" style={{margin:20}}>Upload Image</label>
              <input
              hidden
              id="upload-image"
                type="file"
                onChange={uploadImage}
              />
            </div>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <form onSubmit={addequipmentForm.handleSubmit}>


                <MDBInput wrapperClass='mb-4' id='title' type='title' label='Title' value={addequipmentForm.values.title} onChange={addequipmentForm.handleChange} className="form-control form-control-lg" />
              
                <MDBInput wrapperClass='mb-4'  id='description' type='Description' label='Description' value={addequipmentForm.values.description}
              onChange={addequipmentForm.handleChange} 
              />
                
                <MDBInput wrapperClass='mb-4' type='price' id='price' label='price'  value={addequipmentForm.values.price}
              onChange={addequipmentForm.handleChange}
               />
                {/* <MDBInput wrapperClass='mb-4' type='image' id='image' label='image' value={addequipmentForm.values.image}
              onChange={addequipmentForm.handleChange}
              className="form-control form-control-lg" /> */}

                <MDBInput wrapperClass='mb-4' id='category'type='Category' label='Category' value={addequipmentForm.values.category}
              onChange={addequipmentForm.handleChange}
               />

                {/* <MDBCheckbox
      wrapperClass='d-flex justify-content-center mb-4'
      id='form6Example8'
      label='Create an account?'
      defaultChecked
    /> */}
                <button className='btn btn-primary' style={{margin:10}}>
                  Save
                </button>
                <button className='btn btn-primary' style={{margin:10}}>
                  Save & Add Another
                </button>
                <button className='btn btn-primary' style={{margin:10}}>
                  Cancel
                </button>

              </form>


            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>

  )
}

export default AddEquipment;

