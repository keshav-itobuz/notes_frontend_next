"use client";
import { NotesType } from "@/Types/NotesType";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import React, { useContext } from "react";
import UserContext from "@/context/UserContext";
import NotesContext from "@/context/NotesContext";
import { useMutation } from "@apollo/client";
import {
  DeleteNoteMutation,
  DeleteNoteMutationVariables,
  SwitchIsImportantMutation,
  SwitchIsImportantMutationVariables,
} from "@/graphql/graphql";
import {
  delete_note_mutation,
  update_note_mutation,
} from "@/graphql/notes.mutation";
import catchError from "../lib/catch-error";
import { usePathname } from "next/navigation";

function NoteCard({ note }: Readonly<{ note: NotesType }>) {
  const { user } = useContext(UserContext);
  const { setNotes, getImportantNotes } = useContext(NotesContext);
  const path = usePathname();

  const [deleteNote] = useMutation<
    DeleteNoteMutation,
    DeleteNoteMutationVariables
  >(delete_note_mutation, {
    onCompleted: () => {
      setNotes((prev) => prev.filter((item) => item.title !== note.title));
    },
    onError: (error) => {
      catchError(error, true);
    },
  });

  async function handleDeleteNote() {
    if (user) {
      deleteNote({ variables: { noteId: note.id! } });
    } else {
      const notes = localStorage.getItem("notes");
      const notesList = notes ? JSON.parse(notes) : [];
      notesList.map((item: NotesType, index: number) => {
        if (item.title === note.title) {
          notesList.splice(index, 1);
        }
      });
      localStorage.setItem("notes", JSON.stringify(notesList));
      setNotes(notesList);
    }
  }

  const [markAsImportant] = useMutation<
    SwitchIsImportantMutation,
    SwitchIsImportantMutationVariables
  >(update_note_mutation, {
    onCompleted: () => {
      if (path === "/importantNotes") {
        getImportantNotes(true);
      } else {
        getImportantNotes(false);
      }
    },
    onError: (error) => {
      catchError(error, true);
    },
  });

  function setImportantNote(title: string) {
    if (user) {
      markAsImportant({ variables: { noteId: note.id! } });
    } else {
      const notes = localStorage.getItem("notes");
      const notesList = notes ? JSON.parse(notes) : [];
      notesList.map((note: NotesType) => {
        if (note.title === title) {
          note.isImportant = !note.isImportant;
        }
      });
      localStorage.setItem("notes", JSON.stringify(notesList));
    }
  }

  return (
    <div className="bg-white p-5 w-[350px]  rounded-lg shadow-md flex flex-col relative">
      <span
        className={`${
          note.isImportant ? "bg-red-400" : "bg-gray-400"
        } h-12 w-1 rounded-r-3xl absolute start-0 top-7`}
      />
      <span className="text-2xl truncate">{note.title}</span>
      <span className="text-gray-600 text-[13px]">
        {new Date(note.createdAt!).toLocaleDateString()}
      </span>
      <span className="text-gray-600 text-[14px] mt-3">{note.description}</span>
      <div className="flex justify-end gap-3">
        <button className="mt-2" onClick={() => setImportantNote(note.title)}>
          {note.isImportant ? (
            <StarIcon style={{ fontSize: 20, color: "#f87171" }} />
          ) : (
            <StarBorderIcon style={{ fontSize: 20, color: "gray" }} />
          )}
        </button>
        <button className="mt-2 " onClick={() => handleDeleteNote()}>
          <DeleteIcon style={{ fontSize: 20, color: "red" }} />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
