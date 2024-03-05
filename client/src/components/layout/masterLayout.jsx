import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../../assets/images/Logo.svg"
import {Link, NavLink} from "react-router-dom";

const MasterLayout = () => {
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/"> <img src={logo} width="50" /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="me-auto">
                        <NavLink to="/">Dashboard</NavLink>
                        <div className="user-dropdown ms-3 ">
                            <Link to="" >Customer</Link>
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <Link to="/customer/create" className="side-bar-item">
                                        <span className="side-bar-item-caption ms-5 " >New Customer</span>
                                    </Link>
                                </div>
                                <NavLink to="/customer/list" className="side-bar-item">
                                    <span className="side-bar-item-caption ms-5 " >Customer List </span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="user-dropdown ms-3">
                            <Link to="" >Supplier</Link>
                            <div className="user-dropdown-content ">
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <NavLink to="/supplier/create" className="side-bar-item">
                                            <span className="side-bar-item-caption ms-5 ">New Supplier</span>
                                        </NavLink>
                                    </div>
                                    <NavLink to="/supplier/list" className="side-bar-item">
                                        <span className="side-bar-item-caption ms-5 ">Supplier List</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="user-dropdown ms-3 ">
                            <Link to="" >Expense</Link>
                            <div className="user-dropdown-content  ">
                                <div className="user-dropdown-content ">
                                        <div className="mt-4 text-center">
                                            <NavLink to="/expense/type/create" className="side-bar-item">
                                                <span className="side-bar-item-caption ms-5 ">New Expense Type</span>
                                            </NavLink>
                                            <NavLink to="/expense/type/list" className="side-bar-item">
                                                <span className="side-bar-item-caption ms-5 ">New Expense List </span>
                                            </NavLink>
                                            <NavLink to="/expense/create" className="side-bar-item">
                                                <span className="side-bar-item-caption ms-5 ">Expense  </span>
                                            </NavLink>
                                            <NavLink to="/expense/list" className="side-bar-item">
                                                <span className="side-bar-item-caption ms-5 ">Expense List </span>
                                            </NavLink>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="user-dropdown ms-3 ">
                            <Link to="" >Product</Link>
                            <div className="user-dropdown-content ">
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <NavLink to="/brand/create" className="side-bar-item">
                                            <span className="side-bar-item-caption ms-5 ">New Brand</span>
                                        </NavLink>
                                    </div>

                                    <NavLink to="/brand/list" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Brand List</span>
                                    </NavLink>

                                    <NavLink to="/category/create" className="side-bar-item">
                                        <span className="side-bar-item-caption ms-5 ">New Category</span>
                                    </NavLink>
                                    <NavLink to="/category/list" className="side-bar-item">
                                        <span className="side-bar-item-caption ms-5 ">Category List</span>
                                    </NavLink>
                                    <NavLink to="" className="side-bar-item">
                                        <span className="side-bar-item-caption ms-5 ">New Product</span>
                                    </NavLink>
                                    <NavLink to="" className="side-bar-item">
                                        <span className="side-bar-item-caption ms-5 ">Product List</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="user-dropdown ms-3 ">
                            <h>Purchase</h>
                            <div className="user-dropdown-content ">
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <NavLink to="" className="side-bar-item">
                                            <span className="side-bar-item-caption ms-5 ">New Purchase</span>
                                        </NavLink>
                                    </div>

                                    <NavLink to="" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Purchase List</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="user-dropdown ms-3 ">
                            <h>Sale</h>
                            <div className="user-dropdown-content ">
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <NavLink to="" className="side-bar-item">
                                            <span className="side-bar-item-caption ms-5 ">New Sale</span>
                                        </NavLink>
                                    </div>

                                    <NavLink to="" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Sale List</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="user-dropdown ms-3 ">
                            <h>Return</h>
                            <div className="user-dropdown-content ">
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <NavLink to="" className="side-bar-item">
                                            <span className="side-bar-item-caption ms-5 ">New Return</span>
                                        </NavLink>
                                    </div>

                                    <NavLink to="" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Return List</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="user-dropdown ms-3 ">
                            <h>Report</h>
                            <div className="user-dropdown-content ">
                                <div className="user-dropdown-content ">
                                    <div className="mt-4 text-center">
                                        <NavLink to="" className="side-bar-item">
                                            <span className="side-bar-item-caption ms-5 ">Sale Report</span>
                                        </NavLink>
                                    </div>

                                    <NavLink to="" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Return Report</span>
                                    </NavLink>
                                    <NavLink to="" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Purchase Report</span>
                                    </NavLink>
                                    <NavLink to="" className="side-bar-item ">
                                        <span className="side-bar-item-caption ms-5 ">Expense Report</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </Nav>

            </Container>
        </Navbar>
    )
};

export default MasterLayout;
