import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNotes } from "../features/notes/noteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Notes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const notes = useSelector((state) => state.note.notes);
    const dispatch = useDispatch();
    const filteredData = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDelete = (id) => {
        dispatch(removeFromNotes(id));
    }
    const copyToClipboard = async (title, content) => {
        let copiedText = title + "\n\n" + content;
        await navigator.clipboard.writeText(copiedText);
        toast.success("Copied to clipboard");
    }



    const [sharableLink, setSharableLink] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const copyLink = async () => {
        await navigator.clipboard.writeText(sharableLink);
        toast.success("Copied Link to clipboard");
    }
    const handleShare = (id) => {
        setShowPopup(true);
        setSharableLink(`http://localhost:5173/notes/${id}`);
    }


    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: "long" });
        const year = date.getFullYear();
        const getSuffix = (d) => {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
        return `${month} ${day}${getSuffix(day)}, ${year}`;



    }

    return (
        <div>
            <input
                className="p-2 rounded-xl bg-black w-[70%] mt-5"
                type="search"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-col gap-5 mt-5">
                {filteredData.length > 0 &&
                    filteredData.map((note) => (
                        <div className="border rounded-md" key={note._id}>
                            <div>
                                <h2 className="text-2xl">{note.title}</h2>
                            </div>
                            <div>
                                <p>{note.content}</p>
                            </div>
                            <div className="flex flex-row place-content-evenly">
                                <button>
                                    <Link to={`/?notesId=${note._id}`}>
                                        Edit
                                    </Link>
                                </button>
                                <button>
                                    <Link to={`/notes/${note._id}`}>
                                        View
                                    </Link>
                                </button>
                                <button onClick={() => handleDelete(note._id)}>Delete</button>
                                <button onClick={() => copyToClipboard(note.title, note.content)}>Copy</button>
                                <button onClick={() => handleShare(note._id)}>Share</button>
                            </div>
                            <div>{formatDate(note.createdAt)}</div>
                        </div>
                    ))}
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-black bg-opacity-20 p-6 rounded-xl shadow-lg max-w-md w-full">
                        <h2 className='text-lg font-semibold mb-3'>Sharable Link</h2>
                        <input
                            type="text"
                            value={sharableLink}
                            readOnly
                            className='w-full border p-2 rounded mb-4'
                        />
                        <div className="flex justify-between">
                            <button onClick={copyLink} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                            >Copy</button>
                            <button className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400' onClick={() => setShowPopup(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notes;
