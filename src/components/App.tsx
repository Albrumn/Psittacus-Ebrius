import React from "react";
import Menu_FlashCard from "../pages/flashCards/Menu_FlashCard";
import Activity_FlashCard from "./Activity_FlachCard";
import "./App.css";
import Header from "./Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { SelectedFlashCard } from "../helper/Context";

export default function App() {
    const [selectedFlashCard, setSelectedFlashCard] = React.useState({});

    return (
        //@ts-ignore
        <SelectedFlashCard.Provider value={{ selectedFlashCard, setSelectedFlashCard }}>
            <Header />
                <Routes>
                    <Route path="/" element={<Menu_FlashCard />} />
                    <Route path="/flashcards" element={<Activity_FlashCard data={selectedFlashCard} />} />
                </Routes>
        </SelectedFlashCard.Provider>
    );
}