import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../types/types";

const initialState: Contact[] = [];

const contactsSlice = createSlice({
 name: "contacts",
 initialState,
 reducers: {
 addContact(state, action: PayloadAction<Contact>) {
 state.push(action.payload);
 },
 editContact(state, action: PayloadAction<Contact>) {
 const index = state.findIndex(
 (contact) => contact.id === action.payload.id
 );
 if (index !== -1) {
 state[index] = action.payload;
 }
 },
 deleteContact(state, action: PayloadAction<string>) {
 return state.filter((contact) => contact.id !== action.payload);
 },
 },
});

export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;