// Form.jsx
import React, { useState } from "react";

const Form = ({ onSubmit, existingData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    weekday: "Monday",
    gender: "male",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailExists = existingData?.some(
      (item) => item.email === formData.email
    );
    const isContactExists = existingData?.some(
      (item) => item.contact === formData.contact
    );

    if (isEmailExists || isContactExists) {
      alert("Email or contact already exists!");
      return;
    }
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(formData.contact)) {
      alert("Contact should be a 10-digit number!");
      return;
    }
    const dobDate = new Date(formData.dob);
    const minDobDate = new Date("1900-01-01");
    const maxDobDate = new Date();

    if (dobDate < minDobDate || dobDate > maxDobDate) {
      alert("DOB should be between January 1, 1900, and the current date!");
      return;
    }
    const trimmedName = formData.name.trim();
    const names = trimmedName.split(" ");
    if (names.length < 2) {
      alert("Please provide both first name and last name!");
      return;
    }
    onSubmit(formData);
    setFormData({
      name: "",
      email: "",
      contact: "",
      weekday: "Monday",
      gender: "male",
      dob: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto my-4 bg-back p-6 rounded shadow-md"
    >
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          <span className="text-gray-400">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </label>
      </div>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        <span className="text-gray-400">Email:</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        <span className="text-gray-400">Contact:</span>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <span className="text-gray-400">Weekday:</span>
        <select
          name="weekday"
          value={formData.weekday}
          onChange={handleChange}
          className="mt-1 p-2 ml-2 border-gray-400 border-solid border rounded-lg"
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </label>

      <label className="block mb-2 text-sm font-medium text-gray-900">
        <span className="text-gray-400">Gender:</span>
        <label className="ml-5 text-gray-400">
          Male :
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
            className="mt-1 p-2 ml-2"
          />
        </label>
        <label className=" ml-3 text-gray-400">
          Female :
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
            className="mt-1 p-2 ml-2"
          />
        </label>
      </label>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        <span className="text-gray-400">Date of Birth:</span>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </label>
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
