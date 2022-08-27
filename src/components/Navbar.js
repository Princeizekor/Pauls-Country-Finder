import React from 'react'

function Navbar({dark, setDark}) {

    const handleDark = () => {
        setDark(!dark)
    }

    return (
                <nav id="navbar" className={dark ? 'dark' : null}>
            <div className="web-logo">
                <h4>Where in the World?</h4>
            </div>
            <div className="darkmode" onClick={handleDark}>
                <button className="mode"><i className="far fa-moon moon"></i>Dark Mode</button>
            </div>
    </nav>
    )
}

export default Navbar
