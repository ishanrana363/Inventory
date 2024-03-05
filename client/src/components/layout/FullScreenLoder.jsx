import React from 'react'

const FullScreenLoder = (props) => {
    return (
        <div className={props.visibility} >
            <div className={"LoadingOverlay"}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </div>
    )
}

export default FullScreenLoder;
