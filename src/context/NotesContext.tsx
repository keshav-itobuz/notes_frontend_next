import catchError from "@/app/lib/catch-error";
import {
  AddNoteMutation,
  AddNoteMutationVariables,
  GetAllNotesQuery,
  GetAllNotesQueryVariables,
} from "@/graphql/graphql";
import { add_note_mutation } from "@/graphql/notes.mutation";
import { NotesType } from "@/Types/NotesType";
import { useLazyQuery, useMutation } from "@apollo/client";
import React, {
  useState,
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from "react";
import UserContext from "./UserContext";
import { get_all_notes } from "@/graphql/notes.query";

type noteContextType = {
  notes: NotesType[];
  setNotes: React.Dispatch<React.SetStateAction<NotesType[]>>;
  handleAddNote: (data: NotesType) => void;
  getImportantNotes: (important: boolean) => void;
};
const NotesContext = createContext<noteContextType>({
  notes: [],
  setNotes: () => {},
  handleAddNote: () => {},
  getImportantNotes: () => {},
});

export function NotesProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const { user } = useContext(UserContext);

  const [addNote] = useMutation<AddNoteMutation, AddNoteMutationVariables>(
    add_note_mutation,
    {
      onCompleted: () => {
        getNotes();
      },
      onError: (error) => {
        catchError(error, true);
      },
    }
  );

  const [getNotes] = useLazyQuery<GetAllNotesQuery, GetAllNotesQueryVariables>(
    get_all_notes,
    {
      onCompleted: (data) => {
        setNotes(data.getAllNotes.data);
      },
      onError: (error) => {
        catchError(error, true);
      },
    }
  );

  function getImportantNotes(important: boolean) {
    if (user) {
      getNotes({ variables: { getImportant: important } });
    }
  }

  function handleAddNote(data: NotesType) {
    if (!user) {
      const notes = localStorage.getItem("notes");
      const notesList = notes ? JSON.parse(notes) : [];
      let newNote = true;
      notesList.map((note: NotesType) => {
        if (note.title === data.title) {
          alert("Note already exists");
          newNote = false;
        }
      });
      if (newNote) {
        notesList.push({
          ...data,
          createdAt: new Date().toLocaleDateString(),
          isImportant: false,
        });
        localStorage.setItem("notes", JSON.stringify(notesList));
        setNotes(notesList);
      }
    } else {
      addNote({
        variables: {
          notes: [
            {
              title: data.title,
              description: data.description,
            },
          ],
        },
      });
    }
  }

  useEffect(() => {
    if (user) {
      const data = localStorage.getItem("notes");
      const localNotes = data ? JSON.parse(data) : [];
      if (localNotes.length) {
        addNote({
          variables: {
            notes: localNotes,
          },
        });
      }
      localStorage.removeItem("notes");
      getNotes();
    } else {
      const data = localStorage.getItem("notes");
      const parsedNotes = data ? JSON.parse(data) : [];
      setNotes(parsedNotes);
    }
  }, [user, getNotes]);

  const value = useMemo(
    () => ({ notes, handleAddNote, setNotes, getImportantNotes }),
    [notes]
  );
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export default NotesContext;
