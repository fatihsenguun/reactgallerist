import React from 'react'
import "../css/compWelcomeSection.css"

function WelcomeSection({title, desc}) {
    return (
        <div className="welcome-section">
            <h1 className="welcome-title">{title}</h1>
            <p className="welcome-subtitle">{desc}</p>
        </div>
    )
}

export default WelcomeSection