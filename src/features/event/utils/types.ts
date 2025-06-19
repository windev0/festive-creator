export interface IVideoData {
  title: string;
  category: string;
  duration: string; // ex: '1min'
  message: string;
  musicId: string;
  photoIds: string[];
  userId: string;
  $id: string;
}

export interface IEvent {
  title: string;
  category: string;
  duration: string;
  message: string;
  musicId: string;
  photoIds: string[];
  userId: string;
  $id: string;
  $sequence: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

export interface VideoPreviewProps {
  musicId: string;
  photoIds: string[];
  duration: string;
}
