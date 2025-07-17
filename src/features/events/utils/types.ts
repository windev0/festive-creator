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
  customMessage: string;
  donationEnabled: boolean;
  donationGoal: string;
  donationDescription: string;
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
