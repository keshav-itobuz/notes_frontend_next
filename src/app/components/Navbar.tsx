"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import NoteModal from "./NoteModal";
import UserContext from "@/context/UserContext";
import LoginModal from "./LoginModal";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const [active, setActive] = useState("All Notes");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between mt-10 max-w-[1200px] mx-10 xl:mx-auto bg-white text-blue-600 px-10 py-4 rounded-full">
      <div className="flex flex-row items-center gap-5">
        <Link href="/">
          {" "}
          <button
            onClick={() => {
              setActive("All Notes");
            }}
            className={`px-3 py-1 rounded-lg ${
              active === "All Notes"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-blue-600"
            }`}
          >
            All Notes
          </button>
        </Link>
        <Link href="/importantNotes">
          <button
            onClick={() => {
              setActive("Important");
            }}
            className={`px-3 py-1 rounded-lg ${
              active === "Important"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-blue-600"
            }`}
          >
            Important
          </button>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-5">
        <button
          className="cursor-pointer h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center"
          onClick={() => setIsNoteModalOpen(true)}
        >
          +
        </button>
        {user ? (
          <button onClick={handleLogout}>
            <LogoutIcon />
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded-lg"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
        )}
      </div>

      {isNoteModalOpen && <NoteModal setIsModalOpen={setIsNoteModalOpen} />}
      {isLoginModalOpen && <LoginModal setIsModalOpen={setIsLoginModalOpen} />}
    </div>
  );
}

export default Navbar;
