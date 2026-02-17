import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h2>
                <p className="text-neutral-600">Thank you for contacting us. We will get back to you soon.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-12 text-center">Get in Touch</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-neutral-900 mt-1" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-neutral-600">photography.enen@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Phone className="w-6 h-6 text-neutral-900 mt-1" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-neutral-600">0995-990-0741</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-neutral-900 mt-1" />
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p className="text-neutral-600">Cauayan City, Isabela, Philippines</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-neutral-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                            <input type="text" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                            <input type="email" required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                            <textarea required className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none h-32"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-neutral-900 text-white py-3 rounded-lg font-bold hover:bg-neutral-800 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
