import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { Contact } from "../types/types";
import { deleteContact } from "../store/contactsSlice";
import { RootState } from "../store";
import CrossIcon from "../assets/cross.svg";

const ContactPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts);

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
  };

  const handleDeleteContact = (contactId: string) => {
    dispatch(deleteContact(contactId));
  };

  const handleCancelEdit = () => {
    setSelectedContact(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setIsEditing(true);
  };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <button
        onClick={handleAddContact}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        + Create Contact
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
            <ContactForm
              contactToEdit={selectedContact}
              onCancelEdit={handleCancelEdit}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <img
            src={CrossIcon}
            alt="cross"
            width={100}
            className="mx-auto mb-4"
          />
          <p>
            No contacts found. Please add a contact using the "Create Contact"
            button.
          </p>
        </div>
      ) : (
        <ContactList
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default ContactPage;
