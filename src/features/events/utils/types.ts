export type FormDataType = {
  title: string;
  category: string;
  duration: string;
  photos: File[];
  musicUploaded?: File | null;
  recordedVoice?: any;
  musicUrl: string;
  selectedMusicID?: string;
  selectedTheme: string;
  selectedAnimation: string;
  videoDuration: number;
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
