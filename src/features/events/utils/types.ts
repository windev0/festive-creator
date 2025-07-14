export type FormDataType = {
  title: string;
  category: string;
  duration: string;
  photos: File[];
  music: File | null;
  recordedVoice?: any;
  message: string;
  userId: string;
};

export type MusicLibraryYpe = {
  id: string;
  name: string;
  artist: string;
  duration: string;
  category: string;
  url: string;
};
