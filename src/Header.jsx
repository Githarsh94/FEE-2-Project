import React from 'react';
import icon from './icon.jpg';

function Header({showFavs}) {
    return (
        <header>
            <div className="header-wrap">
                <div className="header-left">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </div>
                <div className="header-middle">
                    <img src={icon} alt="Not Found" />
                    <h3>Musioca</h3>
                </div>
                <div className="header-right">
                    <div className="install-app-btn">
                        <span className="material-symbols-outlined">arrow_circle_down</span>
                        <p>Install App</p>
                    </div>
                    <div className="notif-icon">
                        <span className="material-symbols-outlined">notifications</span>
                    </div>
                    <div className="notif-icon" onClick={showFavs}>
                    <span className="material-symbols-outlined">
                        favorite
                        </span>
                    </div>
                    <div className="profile-icon">S</div>
                </div>
            </div>
            <ul className="filter-icons">
                <li>All</li>
                <li>Music</li>
                <li>Podcasts</li>
            </ul>
        </header>
    );
}

export default Header;
