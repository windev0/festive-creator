import type { musicLibrary } from "@/features/events/utils/constants";

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

export type MusicLibraryYpe = (typeof musicLibrary)[0];
