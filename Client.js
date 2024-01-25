
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Card, Navbar, Nav, InputGroup } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import DataTable from 'react-data-table-component';
import * as yup from "yup"
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { FaUserLarge } from "react-icons/fa6";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { FaAddressBook } from "react-icons/fa";
import { CgStack } from "react-icons/cg";
import { CgWebsite } from "react-icons/cg";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFilePersonFill } from "react-icons/bs";

const styles = {
  headRow: {
    style: { color: "black", background: "#00FFFF" }
  },
  headCells: {
    style: { color: "black" }
  },
  cells: {
    style: { color: "#80C8F9", background: "#333" }
  },
  rows: {
    style: { color: "#80C8F9", background: "#333" }
  },
};


function Client() {

  const column = [
    {
      name: " clientId",
      selector: row => row.clientId,
      sortable: true
    },
    {
      name: "clientName",
      selector: row => row.clientName,
      sortable: true
    },

    {
      name: "phone",
      selector: row => row.phone,
      sortable: true
    },
    {
      name: "address",
      selector: row => row.address,
      sortable: true,
    },
    {
      name: "gst",
      selector: row => row.gst,
      sortable: true,
    },
    {
      name: "website",
      selector: row => row.website,
      sortable: true,
    },
    {
      name: "email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "contactPerson",
      selector: row => row.contactPerson,
      sortable: true,
    },
    {
      name: "phoneNumber",
      selector: row => row.phoneNumber,
      sortable: true,
    },
    {
      name: "createdBy",
      selector: row => row.createdBy,
      sortable: true,
    },
    {
      name: "Action",
      selector: row =>
        <div>
          <Button onClick={() => handleEdit(row.clientId)} variant="outline-success"><MdEdit /></Button>
          <Button onClick={() => handleDelete(row.clientId)} variant="outline-danger" ><MdDelete /></Button>
        </div>
    }
  ]
  const [records, setRecords] = useState([])
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState({
    clientName: "",
    phone: "",
    address: "",
    gst: "",
    website: "",
    email: "",
    contactPerson: "",
    phoneNumber: ""

  })
  const [saving, setSaving] = useState("Save")

  const schema = yup.object().shape({
    clientName: yup.string().required("ClientName required"),
    phone: yup.number().positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10).required('Phone is required'),
    address: yup.string().required('address is  required'),
    gst: yup.string().required('gst is  required'),
    email: yup.string().email().required("Email is required"),
    phoneNumber: yup.number().positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10).required('phoneNumber is required'),
    website: yup.string().required("Website is required"),
    contactPerson: yup.string().required("ContactPerson is required")
  })

  useEffect(() => {
    axios.get("http://catodotest.elevadosoftwares.com/Client/GetAllClientDetails").then(res => {
      setRecords(res.data.clientList)
    })
  }, [])
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleClear = () => {
    setUser("")
  }
  const handleSubmit = () => {

    console.log("submit")
    if (editing) {
      handleUpdate();
    }
    else {
      handleSave();
    }

  }
  const handleUpdate = () => {
    const data = {
      clientId: user.clientId,
      clientName: user.clientName,
      phone: user.phone,
      address: user.address,
      gst: user.gst,
      website: user.website,
      email: user.email,
      contactPerson: user.contactPerson,
      phoneNumber: user.phoneNumber,
      createdBy: 1
    }
    axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", data)

    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Data not saved", "", "info");
      }
    });

  }

  const handleDelete = (id) => {
    const del = {
      clientId: id,
      removeRemarks: "test",
      createdBy: 1,
    }
    console.log(del);
    axios.post("http://catodotest.elevadosoftwares.com/Client/RemoveClient", del)
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Data has been removed",
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleSave = () => {
    const data = {
      clientId: 0,
      clientName: user.clientName,
      phone: user.phone,
      address: user.address,
      gst: user.gst,
      website: user.website,
      email: user.email,
      contactPerson: user.contactPerson,
      phoneNumber: user.phoneNumber,
      createdBy: 1
    }
    console.log(data)

    axios.post("http://catodotest.elevadosoftwares.com/Client/InsertClient", data)
    Swal.fire({
      title: "Do you want to save this?",
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }


  const handleEdit = (id) => {
    let resu = records.filter(val => val.clientId == id)
    resu.map(res => {
      setUser({
        ...user,
        clientId: res.clientId,
        clientName: res.clientName,
        phone: res.phone,
        address: res.address,
        gst: res.gst,
        website: res.website,
        email: res.email,
        contactPerson: res.contactPerson,
        phoneNumber: res.phoneNumber
      })
    })
    setSaving("Update")
    setEditing(true)
  }
  return (
    <div>
      <div className='navbar'>
        <Navbar >
        <Navbar.Brand href='/home'><span className='nav_brand'>Home</span></Navbar.Brand>
          <Nav>
            <Nav.Link href="/category" > <Button variant="outline-info" className='nav_link'>Category</Button></Nav.Link>
            <Nav.Link href="/client" ><Button variant="outline-info" className='nav_link2'>Client</Button></Nav.Link>
            <Nav.Link href="/loginpage" className='nav_link3'><Button variant="outline-info" >Logout</Button></Nav.Link>
          </Nav>
        </Navbar>
      </div>
    <div className='client_background'>
      <Row>
        <Col md="3"></Col>
        <Col md="6">
          <Card className='client_card'>
            <Card.Body className='client_cardbody'>
              <Formik
                initialValues={user}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange }) => (
                  <Form>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Client Name</Form.Label>
                        <InputGroup><InputGroupText><FaUserLarge /></InputGroupText>
                        <Form.Control placeholder="Enter Name"
                          type="text"
                          name="clientName"
                          value={user.clientName}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='clientName'
                          className='text-danger'
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Phone</Form.Label>
                        <InputGroup><InputGroupText><FaSquarePhoneFlip/></InputGroupText>
                        <Form.Control placeholder="Enter phone Number"
                          type="text"
                          name="phone"
                          value={user.phone}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='phone'
                          className='text-danger'
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <InputGroup><InputGroupText><FaAddressBook/></InputGroupText>
                        <Form.Control placeholder="Enter Address"
                          type="text"
                          name="address"
                          value={user.address}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }} />
                          </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='address'
                          className='text-danger'
                        />
                      </Form.Group>

                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Gst</Form.Label>
                        <InputGroup><InputGroupText><CgStack/></InputGroupText>
                        <Form.Control
                          placeholder="Enter gst"
                          type="text"
                          name="gst"
                          value={user.gst}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='gst'
                          className='text-danger'
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Website</Form.Label>
                        <InputGroup><InputGroupText><CgWebsite /></InputGroupText>
                        <Form.Control
                          placeholder="Enter website"
                          type="text"
                          name="website"
                          value={user.website}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='website'
                          className='text-danger'
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>PhoneNumber</Form.Label>
                        <InputGroup><InputGroupText><FaPhoneFlip /></InputGroupText>
                        <Form.Control
                          placeholder="Enter phonenumber"
                          type="text"
                          name="phoneNumber"
                          value={user.phoneNumber}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='phoneNumber'
                          className='text-danger'
                        />
                      </Form.Group>

                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Email</Form.Label>
                        <InputGroup><InputGroupText><MdEmail/></InputGroupText>
                        <Form.Control
                          placeholder="Enter Email"
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='email'
                          className='text-danger'
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>ContactPerson</Form.Label>
                        <InputGroup><InputGroupText><BsFilePersonFill/></InputGroupText>
                        <Form.Control
                          placeholder="Enter Contact person Name"
                          type="text"
                          name="contactPerson"
                          value={user.contactPerson}
                          onChange={(e) => {
                            handleInput(e);
                            handleChange(e);
                          }}
                        />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='contactPerson'
                          className='text-danger'
                        />
                      </Form.Group>

                    </Row>

                    <Button type="submit" onClick={handleSubmit} className='client_save'>{saving}</Button>
                    <Button type="reset" onClick={handleClear}  className='client_cancel'>Cancel</Button>

                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col md="3"></Col>
      </Row>
      <div className='client_datatable'>
        <DataTable
          columns={column}
          data={records}
          customStyles={styles}
          pagination  
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10]}
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
      </div>
    </div>
  )

}

export default Client




