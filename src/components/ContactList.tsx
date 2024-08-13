import React from "react";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import { Contact } from "../store/types";
import { RootState } from "../store";

interface ContactListProps {
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEdit, onDelete }) => {
  const contacts = useSelector((state: RootState) => state.contacts);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={() => onEdit(contact)}
          onDelete={() => onDelete(contact.id)}
        />
      ))}
    </div>
  );
};

export default ContactList;