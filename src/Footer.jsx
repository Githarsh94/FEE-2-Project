import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="footer1">
                <div className="footer1s">
                    <ul>
                        <h4>Company</h4>
                        <li>About</li>
                        <li>Jobs</li>
                        <li> For the Record</li>
                    </ul>
                    <ul>
                        <h4>Communities</h4>
                        <li>For Artists</li>
                        <li>Developers</li>
                        <li>Advertising</li>
                        <li>Investors</li>
                        <li>Vendors</li>
                    </ul>
                    <ul>
                        <h4>Useful links</h4>
                        <li>Support</li>
                        <li> Free Mobile App</li>
                    </ul>
                </div>

                <div className="footer1t">
                    <div>
                        <a href="https://www.instagram.com/harshit_9417/" style={{ '--i': 8 }}><i className='bx bxl-instagram'></i></a>
                        <a href="../public/index.html" style={{ '--i': 10 }}><i className='bx bxl-twitter'></i></a>
                        <a href="../public/index.html" style={{ '--i': 7 }}><i className='bx bxl-facebook'></i></a>
                    </div>
                </div>
            </div>

            <div className="footer2">
                <div className="footer2s">
                    <p>Legal</p>
                    <p>Safety & Privacy Center</p>
                    <p>Privacy Policy</p>
                    <p>Cookies</p>
                    <p>About Ads</p>
                    <p>Accessibility</p>
                </div>

                <div className="footer2t">
                    <p>@ 2024 Musioca AB</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
