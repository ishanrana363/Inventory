import React, {useState} from 'react';
import parse from "html-react-parser";
import footerStore from "../../apiRequest/footerApi/footerApi.js";

const About = () => {
    const { footerData } = footerStore();
    return (
        <div>
            <>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-12 p-5 "}>
                            {
                                footerData.length>0 ? <>
                                        {parse(footerData[0]["description"])}
                                </> :
                                    <div>
                                    <span></span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default About;