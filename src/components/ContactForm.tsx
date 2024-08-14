import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../store/contactsSlice";
import { ContactFormProps, ContactStatus } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const ContactForm: React.FC<ContactFormProps> = ({
  contactToEdit,
  onCancelEdit,
  onSave,
}) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(contactToEdit?.firstName || "");
  const [lastName, setLastName] = useState(contactToEdit?.lastName || "");
  const [status, setStatus] = useState<ContactStatus>(
    contactToEdit?.status || "Inactive"
  );

  const isFormValid = firstName.length >= 3 && lastName.length >= 3;

  useEffect(() => {
    if (contactToEdit) {
      setFirstName(contactToEdit.firstName);
      setLastName(contactToEdit.lastName);
      setStatus(contactToEdit.status);
    }
  }, [contactToEdit]);

  const handleSave = () => {
    if (firstName && lastName) {
      if (contactToEdit) {
        dispatch(
          editContact({ id: contactToEdit.id, firstName, lastName, status })
        );
      } else {
        dispatch(addContact({ id: uuidv4(), firstName, lastName, status }));
      }
      setFirstName("");
      setLastName("");
      setStatus("Inactive");
      onSave();
      onCancelEdit();
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer mb-8">
        <h2 className="text-2xl">
          {contactToEdit ? "Edit Contact" : "Create Contact"}
        </h2>
        <p className="text-xl font-bold" onClick={onCancelEdit}>
          X
        </p>
      </div>
      <div className="mb-4">
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Status</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="Active"
              checked={status === "Active"}
              onChange={() => setStatus("Active")}
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={() => setStatus("Inactive")}
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>
      <button
        onClick={handleSave}
        className={`${
          !isFormValid ? "bg-gray-300 cursor-not-allowed" : "bg-black"
        } text-white px-4 py-2 rounded mt-4`}
        disabled={!isFormValid}
      >
        {contactToEdit ? "Save Edited Contact" : "Save Contact"}
      </button>
      {contactToEdit && (
        <button onClick={onCancelEdit} className="ml-4 text-red-500">
          Cancel
        </button>
      )}
    </div>
  );
};

export default ContactForm;
