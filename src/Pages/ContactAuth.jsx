import React, { useState } from 'react';
import "./Pages.css";


const ContactAuth = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // Handle form input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission (show confirmation message and reset form)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh on form submit
        alert("Message sent! We'll be in touch soon.");
        setFormData({ name: '', email: '', message: '' }); // Reset form after sending
    };

    // CONTACT PAGE
    return (
            <div className="contact-page">
                <h1 className='headline-all'>Contact Us</h1>
                <p className='contact'>
                    You can contact us through the form below, or you can email us directly at 
                    <span className='green'>contact@mygarden.com</span>. 
                    We aim to respond to all inquiries as quickly as possible. 
                    <br></br><br></br>Thank you for being part of our community! 🌱
                </p>
                {/* Message form*/}
                <section className="form-section">
                <form onSubmit={handleSubmit} className="form-contact">
                    <label>
                        Title                    </label>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title} 
                            onChange={handleChange} 
                            placeholder="Title" 
                            required
                        />

                    <label>
                        Message:                    </label>
                        <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            placeholder="Your message" 
                            rows="4" 
                            required 
                        />
                    <button type="submit">Send Message</button>
                </form>
                </section>
            </div>
    );
};

export default ContactAuth;
