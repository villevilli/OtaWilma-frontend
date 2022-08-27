import React from "react";

class Navbar extends React.Component {

    render() {
        return (
            <div className="top" id="top">
            <div className="user-info">
                <div className="user-data">
                    <h1 id="username"></h1>
                    <h2>Opiskelija</h2>
                    <div className="logout" id="logout">
                        <h6>Kirjaudu ulos</h6>
                    </div>
                </div>
            </div>
            <button id="/views/frontpage.html">
                <h1 className="logo-text">OtaWilma</h1>
            </button>
            <button id="/views/messages.html">
                <h5>Viestit</h5>
            </button>
            <button id="/views/grades.html">
                <h5>Opinnot</h5>
            </button>
            <button id="/views/course-tray.html">
                <h5>Kurssitarjotin</h5>
            </button>
            <button id="/views/news.html">
                <h5>Tiedotteet</h5>
            </button>
            <button id="/views/teachers.html">
                <h5>Opettajat</h5>
            </button>
            <button id="/views/settings.html">
                <h5>Asetukset</h5>
            </button>
            </div>
        )
    };
}

export default Navbar;