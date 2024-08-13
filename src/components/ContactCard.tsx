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
 <div className="bg-white rounded-lg border-2 p-4 flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
 <div className="flex-1 min-w-0">
 <h3 className="text-lg font-semibold truncate">
 {contact.firstName} {contact.lastName}
 </h3>
 <p className="text-sm text-gray-600 truncate">{contact.status}</p>
 </div>
 <div className="flex space-x-2">
 <button
 onClick={() => onEdit(contact)}
 className="p-2 text-blue-500 hover:text-blue-700"
 >
 Edit
 </button>
 <button
 onClick={() => onDelete(contact.id)}
 className="p-2 text-red-500 hover:text-red-700"
 >
 Delete
 </button>
 </div>
 </div>
 );
};

export default ContactCard;