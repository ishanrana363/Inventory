import React from 'react';
import {NavLink} from "react-router-dom";

const CustomerDropDown = () => {
    return (
        <div>
            <div className="user-dropdown-content ">
                <div className="mt-4 text-center">
                    <NavLink to="" className="side-bar-item">
                        <span className="side-bar-item-caption ms-5 ">New Customer</span>
                    </NavLink>
                </div>
                <NavLink to="" className="side-bar-item">
                    <span className="side-bar-item-caption ms-5 ">Customer List </span>
                </NavLink>
            </div>
        </div>
    );
};

export default CustomerDropDown;