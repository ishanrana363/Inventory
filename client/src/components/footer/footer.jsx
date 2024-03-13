import React from 'react';
import {Link} from "react-router-dom";
const Footer = () => {
    return (
        <div>
            <div className="section-bottom shadow-sm bg-white">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-4">
                            <h3 className={"text-2xl text-body "}>Legals</h3>
                            <p className="my-2">
                                <Link className="nav-link" to="/about">About</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to={"/privacy-policy"}> Privacy  Policy</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/refund">Refund</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/terms">Terms</Link>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h3 className={"text-2xl text-body "}>Information</h3>
                            <p className="my-2">
                                <Link className="nav-link" to="/how-to-buy">How to buy</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </p>
                            <p className="my-2">
                                <Link className="nav-link" to="/complain">Complain</Link>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h3 className={"text-2xl text-body "}>About</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-dark py-2 mb-5 text-center">
                <p className="text-white mt-3 ">All Rights Reserved </p>
            </div>
        </div>    );
};

export default Footer;