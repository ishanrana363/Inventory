import React from 'react';
import MasterLayout from "./masterLayout.jsx";
import FooterPage from "../../pages/footer/footerPage.jsx";

const Layout = (props) => {
    return (
        <div>
            <MasterLayout/>
                { props.children}
            <FooterPage/>

        </div>
    );
};

export default Layout;