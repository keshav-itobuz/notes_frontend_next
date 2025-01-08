"use client";
import NotesContext from "@/context/NotesContext";
import { NotesType } from "@/Types/NotesType";
import { NotesValidationSchema } from "@/Validators/NotesValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function NoteModal({
  setIsModalOpen,
}: Readonly<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const form = useForm<NotesType>({
    resolver: yupResolver(NotesValidationSchema),
  });
  const { register } = form;
  const { handleAddNote } = useContext(NotesContext);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white py-4 px-6 rounded-lg  w-96 h-fit pt-10 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <FormProvider {...form}>
          <div>
            <h1 className="text-xl font-bold mb-3">Add a note</h1>
            <button
              className="absolute top-3 right-5 text-red-700 font-bold cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
          </div>
          <div>
            <div className="mb-7 relative">
              <input
                className="w-full border p-2 rounded-lg mt-2"
                placeholder="Title"
                {...register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-red-600 text-[13px] h-fit absolute bottom-[-19px] left-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="relative">
              <textarea
                className="w-full h-32 border p-2 rounded-lg"
                placeholder="Type your note here"
                {...register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-red-600 text-[13px] absolute bottom-[-13px] left-1">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-center justify-end mt-6 mb-2">
            <button
              className="bg-red-600 text-white p-2 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button
              className="bg-blue-600 text-white p-2 rounded-lg"
              onClick={form.handleSubmit((data) => {
                handleAddNote(data);
                setIsModalOpen(false);
              })}
            >
              Submit
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
