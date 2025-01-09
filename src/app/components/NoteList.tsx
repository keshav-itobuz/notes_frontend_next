"use client";
import React, { useContext, useState } from "react";
import NoteCard from "./NoteCard";
import { NotesType } from "@/Types/NotesType";
import UserContext from "@/context/UserContext";
import NotesContext from "@/context/NotesContext";
import defaultImage from "../../assets/images/profile.png";
import Image from "next/image";

function NoteList() {
  const { user, handleProfileImageUpload } = useContext(UserContext);
  const { notes } = useContext(NotesContext);

  const [image, setImage] = useState<string | null>(user?.imageUrl ?? null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImage(imageURL);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      handleProfileImageUpload(file);
    }
  };

  return (
    <div className="max-w-[1200px] mx-10 xl:mx-auto my-8">
      {user && (
        <div className="flex items-center mb-10 ms-10 gap-3">
          <form>
            <label htmlFor="imageInput" className="relative cursor-pointer">
              <Image
                src={image || defaultImage}
                alt="profileImage"
                width={0}
                height={0}
                className="h-16 w-16 rounded-full"
                loader={image ? () => image : undefined}
              />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="imageInput"
              className="hidden"
            />
          </form>
          <div>
            <div className="text-2xl font-semibold  text-blue-600">
              Hello {user.name}
            </div>
            <button
              className="px-2 rounded-lg text-blue-600 text-sm border border-blue-600"
              onClick={handleSubmit}
            >
              upload
            </button>
          </div>
        </div>
      )}
      {notes.length ? (
        <div className="flex gap-10 flex-wrap ms-8">
          {notes.map((note: NotesType) => (
            <NoteCard key={note.title} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-60">
          <span className="text-xl">No notes found</span>
        </div>
      )}
    </div>
  );
}

export default NoteList;
