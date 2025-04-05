import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Links, useParams } from "react-router-dom";

const ViewNote = () => {
    const copyToClipboard = async (title, content) => {
        let copiedText = title + "\n\n" + content;
        await navigator.clipboard.writeText(copiedText);
        toast.success("Copied to clipboard");
    }

    const { id } = useParams();
    const allNotes = useSelector(state => state.note.notes);
    const note = allNotes.find(note => note._id === id);
    console.log(note.content)
    return (
        <div>
            <div className="flex flex-row gap-7 p-2 place-content-between">
                <input
                    readOnly
                    className="p-2 w-[66%] rounded-xl mt-2  bg-black pl-5"
                    type="text"
                    placeholder="Enter title here"
                    value={note.title}
                />
                <button className="p-1 rounded-2xl mt-2"    >
                    <Link to={`/?notesId=${note._id}`}>
                        Edit
                    </Link>
                </button>
                <button className="p-1 rounded-2xl mt-2"
                    onClick={() => copyToClipboard(note.title, note.content)}>Copy</button>
            </div>

            <div>
                <textarea
                    className="rounded-xl mt-4 min-w-[500px] p-4 bg-black pl-5"
                    readOnly
                    value={note.content}
                    placeholder="Enter Content Here"
                    rows={20}
                />
            </div>
        </div>
    )
}

export default ViewNote
