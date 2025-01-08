export type NotesType = {
  id?: string;
  title: string;
  description: string;
  createdAt?: string;
  isImportant?: boolean;
};

export type LoginFormType = {
  name?: string;
  email: string;
  password: string;
};
