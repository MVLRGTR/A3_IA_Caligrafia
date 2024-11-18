import React, { CSSProperties } from 'react'

export default function Loader() {

    const loaderWrapperStyle: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50
    }


    const loaderSectionStyle: CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 1
    }

    const loadingTextStyle: CSSProperties = {
        marginTop: "20px", 
        fontSize: "18px",
        fontWeight: "bold",
        color: "#3498db" 
    }

    return (
        <div style={loaderWrapperStyle}>
            <div className='loader'></div>
            <div style={loaderSectionStyle}></div>
            <span style={loadingTextStyle}>Loading...</span>
        </div>
    )
}