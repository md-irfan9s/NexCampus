import React from "react";
import "./Footer.css"
import Logo from "../../assets/logo/NexCampus.png"

const Footer = () => {

    return (
            <footer className="footer">
                <div className="footer-container">

                    {/* <!-- Left Section --> */}
                    <div className="footer-left">
                        
                        <img src={Logo} alt="NexCapmus" width={156} height={42}/>
                        <p className="footer-text">
                            "A centralized digital platform simplifying college life for every student."
                        </p>

                        <div className="social-icons">
                            {/* <a href="https://www.facebook.com/"><img src="assets/facebook.png" alt="facebook"></a>
                    <a href="https://x.com/"><img src="assets/twitter.png" alt="twitter"></a>
                    <a href="https://www.linkedin.com/"><img src="assets/linkedin.png" alt="linkedin"></a>
                    <a href="https://www.instagram.com/"><img src="assets/instagram.gif" alt="instagram"></a> */}
                        </div>
                    </div>

                    {/* <!-- Divider Line --> */}
                    <div className="footer-divider"></div>

                    {/* <!-- Right Section --> */}
                    <div className="footer-right">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <a href="#">Home</a>
                            <a href="#">Student Corner</a>
                            <a href="#">Lost and Found</a>
                            <a href="#">Campus Feed</a>
                        </div>

                        <div className="footer-column">
                            <h4>Report an Issues</h4>
                            <a href="#">Faculty Content</a>
                            <a href="#">Feedback Form</a>
                            <a href="#">Admin Login</a>
                        </div>

                        <div className="footer-column">
                            <h4>Get In Touch</h4>
                            <a href="#">Email</a>
                            <a href="#">Phone</a>
                            <a href="#">Admin</a>

                        </div>
                    </div>

                </div>


                {/* <!-- Bottom Bar --> */}
                <div className="footer-bottom">
                    <p>©2025 NexCampus. All Rights Reserved</p>
                    <div className="bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms and Condition</a>
                        <a href="#">Contact Us</a>
                    </div>
                </div>
            </footer>
    )

}

export default Footer