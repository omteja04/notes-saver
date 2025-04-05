import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Notes from "./components/Notes";
import ViewNote from "./components/ViewNote";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <Navbar />
                <HomePage />
            </div>
        ),
    },
    {
        path: "/notes",
        element: (
            <div>
                <Navbar />
                <Notes />
            </div>
        ),
    },
    {
        path: "/notes/:id",
        element: (
            <div>
                <Navbar />
                <ViewNote />
            </div>
        ),
    },
    {
        path: "*",
        element: (
            <div>
                <Navbar />
                <NotFound />
            </div>
        ),
    },
]);
const App = () => {
    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
};

export default App;
