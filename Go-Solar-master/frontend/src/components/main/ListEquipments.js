import React, { useState, useEffect } from "react";
import app_config from "../../config";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import useProductContext from "../../context/ProductContext";
import { Link } from "react-router-dom";
const ListEquipment = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const { apiUrl } = app_config;

  const { addItemToCart, isInCart } = useProductContext();

  const fetchEquipmentData = async () => {
    const res = await fetch(apiUrl + "/equipment/getall");
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setMasterList(data);
    setEquipmentList(data);
  };

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  return (
    <div>
      <MDBContainer className="my-5">
        <MDBRow>
          {equipmentList.map((equipment) => (
            <MDBCol md="12" lg="4" className="mb-4 mb-lg-5">
              <MDBCard style={{ height: "550px", backgroundColor: "#F4F4F4" }}>
                <MDBCardImage
                  className="img-fluid rounded"
                  src={apiUrl + "/" + equipment.image}
                  position="top"
                  alt="Laptop"
                  style={{ height: "250px" }}
                />
                <MDBCardBody style={{ height: "350px " }}>
                  <div className="d-flex justify-content-between">
                    <p className="small">
                      <a href="#!" className="text-muted">
                        {equipment.category ? equipment.category : "No Category"}
                      </a>
                    </p>
                   
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <h5
                      className="mb-0"
                      style={{
                        lineHeight: "1em",
                        height: " 3em",
                        overflow: "hidden",
                      }}
                    >
                      {equipment.title}
                    </h5>
                    <h5 className="text-dark mb-0"> ₹ {equipment.price} </h5>
                  </div>

                  <button
                    onClick={(e) => addItemToCart(equipment)}
                    disabled={isInCart(equipment)}
                    className="btn btn-success"
                  >
                    Add to Cart
                  </button>
                  <Link
                    className="btn btn-primary float-end"
                    to={"/main/details/" + equipment._id}
                  >
                    View Details
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ListEquipment;
