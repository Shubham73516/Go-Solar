import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBContainer,
  MDBInputGroup,
  MDBInput,
  MDBCard,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import AddEquipment from "./AddEquipment";
import app_config from "../../config";
import { toast } from "react-hot-toast";

export default function ManageEquipment() {
  const [basicModal, setBasicModal] = useState(false);

  const { apiUrl } = app_config;

  const toggleShow = () => setBasicModal(!basicModal);
  const [userList, setUserList] = useState([]);
  const [records, setRecords] = useState();
  const [masterList, setMasterList] = useState([]);

  const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/equipment/getall');
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setUserList(data);
    setMasterList(data);
  }

  useEffect(() => {
    fetchUserData();

  }, [])

  const [search, setSearch] = useState('')

  const applySearch = (e) => {
    const inputText = e.target.value;

    setUserList(masterList.filter((equipment) => {
      return equipment.title.toLowerCase().includes(inputText.toLowerCase());
    }));
  }

  const deleteEquipment = async (id) => {
    const res = await fetch(apiUrl+'/equipment/delete/'+id, {method: 'DELETE'});

    if(res.status === 200){
      toast.success('Equipment Deleted');
      fetchUserData();
    }
  }

  return (
    <>


      <div className="mb-5 ">
        <h1 className='text-center' style={{ display: "inline-block" }}>Manage Equipment</h1>
        <button className="btn btn-primary " onClick={toggleShow} style={{ float: 'right', margin: 20 }}>Add Equipment</button>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Add New Equipment</MDBModalTitle>
                <button
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></button>
              </MDBModalHeader>
              <MDBModalBody>
                <AddEquipment />
              </MDBModalBody>

              <MDBModalFooter>
                <button className="btn btn-primary" onClick={toggleShow}>
                  Close
                </button>
                <button className="btn btn-primary">Save changes</button>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>
      <MDBContainer className="my-1">
        <MDBInputGroup className="mb-3 mt-2">
          <input label='Search Name' onChange={applySearch} className="form-control form-control-lg" />
          {/* <MDBBtn rippleColor='dark'>
        <MDBIcon icon='search' />
      </MDBBtn> */}
        </MDBInputGroup>
        <MDBCard>

          {/* <br /> */}

          <MDBTable align='middle'>

            <MDBTableHead >
              <tr>
                <th scope='col' className="text-center">Title</th>
                <th scope='col'>Description</th>
                <th scope='col'>Price</th>
                <th scope='col'>Category</th>
                <th scope='col'>image</th>
                <th scope='col'>Seller</th>
                <th scope='col'>Created At</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                userList.map((equip) =>
                (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={apiUrl+'/'+equip.image}
                          alt=''
                          style={{ height: '45px' }}
                          // className='rounded-circle'
                        />
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{equip.title}</p>

                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='text-muted mb-0'>{equip.description}</p>
                    </td>
                    <td>
                      {equip.price}
                    </td>
                    <td>
                      {equip.category}
                    </td>
                    <td>
                      {new Date(equip.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button className="btn btn-link">
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={e => deleteEquipment(equip._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
