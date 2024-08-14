export type ContactStatus = "Active" | "Inactive";

export interface Contact {
 id: string;
 firstName: string;
 lastName: string;
 status: ContactStatus;
}

export interface HistoricalData {
    cases: { [key: string]: number };
    deaths: { [key: string]: number };
    recovered: { [key: string]: number };
  }
  
export interface CountryData {
    country: string;
    countryInfo: { lat: number; long: number; _id?: string };
    active: number;
    recovered: number;
    deaths: number;
  }

export interface ContactFormProps {
    contactToEdit: Contact | null;
    onCancelEdit: () => void;
    onSave: () => void;
  }

export interface ContactListProps {
    onEdit: (contact: Contact) => void;
    onDelete: (contactId: string) => void;
  }