import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Card, Navbar, Nav, NavLink } from 'react-bootstrap';
import { ErrorMessage, Formik } from 'formik';
import DataTable from 'react-data-table-component';
import * as yup from "yup";
import axios from 'axios';
import waveimg from "../images/waveimg.png";
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { TbFileDescription } from "react-icons/tb";
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import InputGroup from 'react-bootstrap/InputGroup';

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

function Category() {

  const column = [
    {
      name: "category",
      selector: row => row.category,
      sortable: true
    },
    {
      name: "description",
      selector: row => row.description,
      sortable: true
    },

    {
      name: "createdBy",
      selector: row => row.createdBy,
      sortable: true
    },
    {
      name: "categoryId",
      selector: row => row.categoryId,
      sortable: true,
    },
    {
      name: "Action",
      selector: row =>
        <div>
          <Button onClick={() => handleEdit(row.categoryId)} variant="outline-info"><MdEdit /></Button>
          <Button onClick={() => handleDelete(row.categoryId)} variant="outline-info" className='table_delete'><MdDelete /></Button>
        </div>
    }
  ]
  const [records, setRecords] = useState([])
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState({
    category: "",
    description: "",
    categoryId: "",
    createdBy: ""
  })
  const [text, setText] = useState("Save")
  const schema = yup.object().shape({
    category: yup.string().required("category is required"),
    description: yup.string().required("description is required")
  })

  useEffect(() => {
    axios.get("http://catodotest.elevadosoftwares.com/Category/GetAllCategories").then(res => {
      setRecords(res.data.categoryList)
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
  const handleUpdate = (id) => {
    const data = {
      categoryId: user.categoryId,
      category: user.category,
      description: user.description,
      createdBy: 1
    }
    axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", data)

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
      categoryId: id,
      removeRemarks: "test",
      createdBy: 1,
    }
    console.log(del);
    axios.post("http://catodotest.elevadosoftwares.com/Category/RemoveCategory", del)
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
      categoryId: 0,
      category: user.category,
      description: user.description,
      createdBy: 1
    }
    console.log(data)

    axios.post("http://catodotest.elevadosoftwares.com/Category/InsertCategory", data)
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
    let resu = records.filter(val => val.categoryId == id)
    resu.map(res => {
      setUser({
        ...user,
        category: res.category,
        description: res.description,
        categoryId: res.categoryId,
      })
    })
    setText("Update")
    setEditing(true)
  }
  return (

    <div className='category_background'>
      <div className='navbar'>
        <Navbar >
          <Navbar.Brand href='/home'><span className='nav_brand'>Home</span></Navbar.Brand>
          <Nav>
            <NavLink href="/category" > <Button variant="outline-info" className='nav_link'>Category</Button></NavLink>
            <NavLink href="/client"  ><Button variant="outline-info" className='nav_link2'>Client</Button></NavLink>
            <Nav.Link href="/loginpage" className='nav_link3'><Button variant="outline-info" >Logout</Button></Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <div>
        <Formik
          initialValues={user}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange }) => (
            <Row>
              <Col md="3"></Col>
              <Col md="6">
                <Card className='card2'>
                  <Card.Body className='category_card' style={{ backgroundImage: `url(${waveimg})` }}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <InputGroup><InputGroupText><TbCategory /></InputGroupText>
                          <Form.Control
                            placeholder="Enter category"
                            type="text"
                            name="category"
                            value={user.category}
                            onChange={(e) => {
                              handleInput(e);
                              handleChange(e);
                            }}
                          />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='category'
                          className='text-danger'
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <InputGroup><InputGroupText><TbFileDescription /></InputGroupText>
                          <Form.Control
                            placeholder="Enter description"
                            type="text"
                            name="description"
                            value={user.description}
                            onChange={(e) => {
                              handleInput(e);
                              handleChange(e);
                            }}
                          />
                        </InputGroup>
                        <span className='text-danger'> * </span>
                        <ErrorMessage
                          name='description'
                          className='text-danger'
                        />
                      </Form.Group>
                      <Button type="submit" onClick={handleSubmit} className='category_button'>{text}</Button>
                      <Button type="reset" onClick={handleClear} className='cancel_button'>Cancel</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="3"></Col>
            </Row>
          )}
        </Formik>
      </div><br /><br />
      <div className='datatable_margin'>
        <DataTable className='datatable'
          columns={column}
          data={records}
          customStyles={styles}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </div>

  )

}

export default Category
