// EditModal.jsx
import React, { useState, useEffect } from "react";

const EditModal = ({ data, onSave, onCancel, existingData }) => {
  const [editedData, setEditedData] = useState({ ...data });

  useEffect(() => {
    setEditedData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const isEmailExists = existingData?.some(
      (item) => item.email === editedData.email
    );
    const isContactExists = existingData?.some(
      (item) => item.contact === editedData.contact
    );

    if (isEmailExists || isContactExists) {
      alert("Email or contact already exists!");
      return;
    }

    // Validate contact as a 10-digit number
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(editedData.contact)) {
      alert("Contact should be a 10-digit number!");
      return;
    }

    // Validate DOB between January 1, 1900, and the current date
    const dobDate = new Date(editedData.dob);
    const minDobDate = new Date("1900-01-01");
    const maxDobDate = new Date();

    if (dobDate < minDobDate || dobDate > maxDobDate) {
      alert("DOB should be between January 1, 1900, and the current date!");
      return;
    }

    // Validate name has both first name and last name
    const trimmedName = editedData.name.trim();
    const names = trimmedName.split(" ");
    if (names.length < 2) {
      alert("Please provide both first name and last name!");
      return;
    }

    onSave(editedData);
  };

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Form Data
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={onCancel}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editedData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={editedData.email}
                  onChange={handleChange}
                  placeholder="abc@email.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contact
                </label>
                <input
                  type="tel"
                  name="contact"
                  id="tel"
                  placeholder="1234567890"
                  value={editedData.contact}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Weekday
                </label>
                <select
                  name="weekday"
                  className="mt-1 p-2 ml-2 border-gray-400 border-solid border rounded-lg"
                  value={editedData.weekday}
                  onChange={handleChange}
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender
                </label>
                <label className="ml-5 text-gray-400">
                  Male :
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={editedData.gender === "male"}
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
                    checked={editedData.gender === "female"}
                    onChange={handleChange}
                    className="mt-1 p-2 ml-2"
                  />
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className="mt-1 p-2 border rounded w-full"
                  value={editedData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={handleSave}
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
