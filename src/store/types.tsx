export type ContactStatus = "Active" | "Inactive";

export interface Contact {
 id: string;
 firstName: string;
 lastName: string;
 status: ContactStatus;
}