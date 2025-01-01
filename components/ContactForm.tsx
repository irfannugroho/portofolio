"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  // State untuk form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State untuk status pengiriman email
  const [status, setStatus] = useState("");

  // Fungsi untuk menangani perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk mengirim email
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mengirim email dengan EmailJS
    const form = e.target as HTMLFormElement; // Type assertion untuk memastikan target adalah HTMLFormElement
    emailjs
      .sendForm(
        "service_7tw9a1r", // Ganti dengan Service ID Anda
        "template_d833doa", // Ganti dengan Template ID Anda
        form,
        "mt97aLc4FYjR-AVZy" // Ganti dengan User ID Anda
      )
      .then(
        (result) => {
          setStatus("Email sent successfully!");
        },
        (error) => {
          setStatus("Failed to send email.");
        }
      );

    // Clear form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <form onSubmit={sendEmail}>
      <h2 className="text-2xl font-bold mb-5 text-white">Contact Me</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>

      <div className="mb-3">
        <textarea
          placeholder="Your message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border-0 rounded shadow"
        />
      </div>

      <button
        type="submit"
        className="px-6 mb-10 py-3 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 hover:bg-blue-400"
      >
        Send a message
      </button>

      {status && <p className="text-white mt-3">{status}</p>}
    </form>
  );
};

export default ContactForm;
