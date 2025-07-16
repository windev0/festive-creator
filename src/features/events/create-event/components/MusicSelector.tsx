import { Button } from "@/components/ui/button";
import {
  eventCategories,
  musicLibrary,
} from "@/features/events/utils/constants";
import type { MusicLibraryYpe } from "@/features/events/utils/types";
import {
  MicIcon,
  MusicIcon,
  PauseIcon,
  PlayIcon,
  SquareIcon,
  UploadIcon,
} from "lucide-react";
import { useRef, useState } from "react";

type VoiceType = {
  id: string;
  name: string;
  url: string;
  duration: string;
};

type MusicSelectorProps = {
  selectedMusic: string | null;
  onMusicSelect: (musicId: string) => void;
  recordedVoice: VoiceType | null;
  onVoiceRecord: (voiceData: VoiceType) => void;
};

const MusicSelector = ({
  selectedMusic,
  onMusicSelect,
  recordedVoice,
  onVoiceRecord,
}: MusicSelectorProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder>(null);
  const recordingIntervalRef = useRef<any>(null);

  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredMusic =
    selectedCategory === "Tous"
      ? musicLibrary
      : musicLibrary.filter((track) => track.id === selectedCategory);

  const handlePlayPause = (track: MusicLibraryYpe) => {
    if (playingTrack === track.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = track.url;
        audioRef.current.play();
        setPlayingTrack(track.id);
        setIsPlaying(true);
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        onVoiceRecord({
          id: "voice-recording",
          name: "Enregistrement vocal",
          url: url,
          duration: formatTime(recordingTime),
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de l'accès au microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 mx-3 ">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choisissez votre musique
        </h2>
        <p className="text-muted-foreground">
          Sélectionnez une musique de fond ou enregistrez un message vocal
        </p>
      </div>

      {/* Voice Recording Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <MicIcon name="Mic" size={20} className="mr-2" />
          Enregistrement vocal
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isRecording ? (
              <Button
                variant="outline"
                // iconName="Mic"
                // iconPosition="left"
                onClick={startRecording}
              >
                <span className="flex justify-center items-center gap-1">
                  <MicIcon />
                  Commencer l'enregistrement
                </span>
              </Button>
            ) : (
              <Button
                variant="destructive"
                // iconName="Square"
                // iconPosition="left"
                onClick={stopRecording}
              >
                <span className="flex justify-center items-center gap-1">
                  <SquareIcon />
                  Arrêter ({formatTime(recordingTime)})
                </span>
              </Button>
            )}

            {recordedVoice && (
              <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
                <MicIcon name="Mic" size={16} className="text-primary" />
                <span className="text-sm font-medium">
                  {recordedVoice.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({recordedVoice.duration})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Music Library */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <MusicIcon name="Music" size={20} className="mr-2" />
          Bibliothèque musicale
        </h3>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {[
            {
              id: "Tous",
              name: "Tous",
            },
            ...eventCategories,
          ].map(({ id, name }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id)}
              className={` cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === id
                  ? "bg-indigo-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Music Tracks */}
        <div className="grid gap-3">
          {filteredMusic.map((track) => (
            <div
              key={track.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                selectedMusic === track.id
                  ? "border-indigo-500 bg-indigo-500/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handlePlayPause(track)}
                  className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-500/90 transition-colors duration-200"
                >
                  {playingTrack === track.id && isPlaying ? (
                    <PauseIcon name={"Pause"} size={16} />
                  ) : (
                    <PlayIcon name={"Play"} size={16} />
                  )}
                </button>

                <div className="mr-4">
                    <h4
                    className="font-medium text-foreground  max-w-[120px] "
                    title={track.name}
                    >
                    {track.name}
                    </h4>
                  <p className="text-sm text-muted-foreground">
                    {track.artist} • {track.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  {track.category}
                </span>
                <Button
                  variant={selectedMusic === track.id ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedMusic === track.id
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : ""
                  }
                  onClick={() => onMusicSelect(track.id)}
                >
                  {selectedMusic === track.id ? "Sélectionné" : "Choisir"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          setPlayingTrack(null);
        }}
        className="hidden"
      />

      {/* Upload Custom Music */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          {/* <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <UploadIcon name="Upload" size={16} className="text-primary" />
          </div> */}
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Musique personnalisée
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              Vous pouvez également télécharger votre propre musique (MP3, WAV)
            </p>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-indigo-200 cursor-pointer "
              //   iconName="Upload"
              //   iconPosition="left"
            >
              <span className="flex justify-center items-center gap-1">
                <UploadIcon />
                <audio
                  controls
                  src={
                    musicLibrary.find((music) => music.id === selectedMusic)
                      ?.url
                  }
                  className="w-full"
                />
                Télécharger un fichier
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
