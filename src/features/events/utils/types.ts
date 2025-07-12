export type FormDataType = {
  title: string;
  category: string;
  duration: string;
  photos: File[];
  music: File | null;
  message: string;
  userId: string;
};

export const initialData: FormDataType = {
  title: "",
  category: "",
  duration: "",
  photos: [],
  music: null,
  message: "",
  userId: "",
};
