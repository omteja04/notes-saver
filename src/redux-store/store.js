import { configureStore } from "@reduxjs/toolkit";
import noteReducer from '../features/notes/noteSlice.jsx'

export const store = configureStore({
    reducer: {
        note: noteReducer,
    }
});