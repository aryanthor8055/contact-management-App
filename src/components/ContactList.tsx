import React from "react";
import { useSelector } from "react-redux";
import ContactCard from "./ContactCard";
import { ContactListProps } from "../types/types";
import { RootState } from "../store";

const ContactList: React.FC<ContactListProps> = ({ onEdit, onDelete }) => {
  const contacts = useSelector((state: RootState) => state.contacts);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
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
