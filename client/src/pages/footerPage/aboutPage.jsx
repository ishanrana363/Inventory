import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import footerStore from "../../apiRequest/footerApi/footerApi.js";
import FullScreenLoder from "../../components/layout/FullScreenLoder.jsx";
import Layout from "../../components/layout/layout.jsx";
import About from "../../components/footer/about.jsx";
import fullScreenLoder from "../../components/layout/FullScreenLoder.jsx";

const AboutPage = () => {
    const {setFooterData } = footerStore();
    const [loader, setLoader] = useState("d-none");

    useEffect(() => {
        (async () => {
            setLoader("");
            await setFooterData("about");
            setLoader("d-none");
        })()
    }, []);

    return (
        <>
            <Layout>
                <About/>
            </Layout>
            <FullScreenLoder visibility = {loader} />
        </>
    );
};

export default AboutPage;
