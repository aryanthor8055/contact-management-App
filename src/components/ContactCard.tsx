import React from "react";
import { Contact } from "../store/types";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-gray-100 rounded-lg border p-4 flex flex-col items-center space-y-4">
      <div className="flex-1 min-w-0 text-center">
        <h3 className="text-lg font-semibold">{contact.firstName} {contact.lastName}</h3>
        <p className="text-sm text-gray-600">{contact.status}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(contact)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;