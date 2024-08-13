import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../store/contactsSlice";
import { Contact, ContactStatus } from "../store/types";
import { v4 as uuidv4 } from "uuid";

interface ContactFormProps {
  contactToEdit: Contact | null;
  onCancelEdit: () => void;
  onSave: () => void;
}

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
      <h2 className="text-2xl mb-4 text-center">
        {contactToEdit ? "Edit Contact Screen" : "Create Contact Screen"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">First Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status:</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="Active"
              checked={status === "Active"}
              onChange={() => setStatus("Active")}
              className="mr-2"
            />
            Active
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={() => setStatus("Inactive")}
              className="mr-2"
            />
            Inactive
          </label>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded mr-2 ${
            !isFormValid ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
          disabled={!isFormValid}
        >
          Save Contact
        </button>
        <button
          onClick={onCancelEdit}
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ContactForm;