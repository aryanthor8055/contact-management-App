import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { Contact } from "../types/types";
import { deleteContact } from "../store/contactsSlice";
import { RootState } from "../store";

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
    <div className="p-4 bg-customSecondary flex justify-center items-center flex-col" style={{width: '80vw'}}>
      <button
        onClick={handleAddContact}
        className="bg-gray-300 text-black px-4 py-2 rounded mb-4 hover:bg-gray-400"
      >
        Create Contact
      </button>

      {isEditing && (
        <div className="bg-gray-100 p-6 rounded-lg border-2 w-full max-w-md mx-auto">
          <ContactForm
            contactToEdit={selectedContact}
            onCancelEdit={handleCancelEdit}
            onSave={handleSave}
          />
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-full border-4 border-gray-300 mb-4">
              <span className="text-4xl">✖</span>
            </div>
            <p>No Contact Found</p>
            <p>Please add contact from Create Contact Button</p>
          </div>
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