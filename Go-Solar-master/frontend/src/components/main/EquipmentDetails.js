import React, { useEffect, useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import useProductContext from '../../context/ProductContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import app_config from '../../config';

const Detail = () => {
    const navigate = useNavigate();
    const { addItemToCart } = useProductContext();
    const [equipmentData, setEquipmentData] = useState(null);
    const {id} = useParams();
    const {apiUrl} = app_config;

    const getEquipmentData = async () => {
        const res = await fetch(apiUrl+'/equipment/getbyid/'+id);
        console.log(res.status);

        const data = await res.json();
        setEquipmentData(data);
        console.log(data);
    }

    useEffect(() => {
      getEquipmentData();
    }, [])
    

    return (
        <MDBContainer className="my-5">
            {
                equipmentData !==null ? (
                    <MDBCard>
                    <MDBRow className='g-0'>
    
                        <MDBCol md='6'>
                            <MDBCardImage src={apiUrl+'/'+equipmentData.image} alt="login form" className='rounded-start w-100' />
                        </MDBCol>
      
                        <MDBCol md='6'>
                            <MDBCardBody className='d-flex flex-column'>
    
                                <div className='d-flex flex-row mt-2'>
    
                                    <span className="h1 fw-bold mb-0">{equipmentData.title}</span>
                                </div>
    
                                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>{equipmentData.description}</h5>
    
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>{equipmentData.price} </p>
                                <MDBInput label='Quantity' id='typeNumber' type='number' />
                                <a className="small text-muted" href="#!">Excluding Sales Tax | Free Shipping</a>
    
                                <Link className="btn btn-primary" to={'/main/ListEquipment'}>Add To Cart</Link>
                                {/* <Link className="btn btn-primary" to={'/user/CheckoutPage'}>Add To Cart</Link> */}
                                {/* <MDBBtn className="mb-4 px-5" color='' size='lg'>Add to Cart</MDBBtn> */}
                                <Link className="btn btn-primary" to={'/user/CheckoutPage'} >Book Now</Link>
                                <p className="mb-3 pb-lg-2" style={{ color: '#3c6255' }}> <a href="#!" style={{ color: '#609966' }}>
                                    In Stock
                                </a></p>
                                <hr />
                                <h4>GENERIC</h4>
                                <hr />
                                <h6>TERMS AND CONDITIONS</h6>
                                <p>100% </p>
    
                            </MDBCardBody>
                        </MDBCol>
    
                    </MDBRow>
                </MDBCard>
                ) : (
                    <div>
                        <h1>Loading ...</h1>
                    </div>
                )
            }


        </MDBContainer>
    )
}

export default Detail