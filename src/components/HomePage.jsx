import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToNotes, updateToNotes } from "../features/notes/noteSlice";
import toast from "react-hot-toast";

const HomePage = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const notesId = searchParams.get("notesId");
    const dispatch = useDispatch();
    const allNotes = useSelector((state) => state.note.notes);
    useEffect(() => {
        if (notesId) {
            const notes = allNotes.find(note => note._id === notesId);
            setTitle(notes.title);
            setValue(notes.content);
        }
    }, [notesId, allNotes]);
    function createMyNotes() {
        const trimmedTitle = title.trim();
        const trimmedValue = value.trim();
        if (!trimmedTitle && !trimmedValue) {
            toast.error("Content or Title cannot be empty");
            return;
        };
        const notes = {
            title: trimmedTitle,
            content: trimmedValue,
            _id: notesId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };


        if (notesId) {
            dispatch(updateToNotes(notes));
            navigate(`/notes/${notesId}`);
        } else {
            dispatch(addToNotes(notes));
        }
        setTitle("");
        setValue("");
        setSearchParams();
    }



    return (
        <div>
            <div className="flex flex-row gap-7 p-2 place-content-between">
                <input
                    className="p-2 w-[90%] rounded-xl mt-2  bg-black pl-5"
                    type="text"
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={createMyNotes}
                    className="p-2 rounded-2xl mt-2"
                >
                    {notesId ? "Update Notes" : "Create Notes"}
                </button>
            </div>

            <div>
                <textarea
                    className="rounded-xl mt-4 min-w-[500px] p-4 bg-black pl-5"
                    value={value}
                    placeholder="Enter Content Here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    );
};

export default HomePage;
