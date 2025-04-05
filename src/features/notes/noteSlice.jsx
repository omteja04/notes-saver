import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: localStorage.getItem("notes")
            ? JSON.parse(localStorage.getItem("notes"))
            : [],
    },
    reducers: {
        addToNotes: (state, action) => {
            const newNote = action.payload;
            const exits = state.notes.some(note => note.title.trim().toLowerCase() === newNote.title.trim().toLowerCase());
            if (exits) {
                toast.error("Note with this title already exists.");
                return;
            }
            state.notes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(state.notes));
            toast.success("Notes Created Successfully!!!")

        },
        updateToNotes: (state, action) => {
            const note = action.payload;
            const index = state.notes.findIndex((item) => item._id === note._id);
            if (index >= 0) {
                state.notes[index] = note;
                localStorage.setItem("notes", JSON.stringify(state.notes));
                toast.success("Notes Updated Successfully!!!")
            }
        },
        resetAllNotes: (state) => {
            state.notes = [];
            localStorage.removeItem("notes");
            toast.success("All Notes Reset Successfully!!!");

        },
        removeFromNotes: (state, action) => {
            const notesId = action.payload;
            console.log(notesId);
            const index = state.notes.findIndex((item) => item._id === notesId);
            if (index >= 0) {
                state.notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(state.notes));
                toast.success("Notes Removed Successfully!!!");
            }
            if (index === -1) {
                toast.error("Note not found!");
                return;
            }


        },
    },
});

export const { addToNotes, removeFromNotes, resetAllNotes, updateToNotes } = noteSlice.actions;
export default noteSlice.reducer;