import type { FormDataType } from "@/features/event/components/CreateEventForm";
import { useEffect, useState } from "react";

type Props = {
  next: () => void;
  prev: () => void;
  data: FormDataType;
  updateForm: (updates: Partial<FormDataType>) => void;
};

const Step3 = ({ next, prev, data, updateForm }: Props) => {
  const [error, setError] = useState("");

  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      updateForm({ music: e.target.files[0] });
    }
  };

  useEffect(()=>{
    if(data?.music){
      setError("")
    }
  }, [data])
  return (
    <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Choisissez une musique
      </h2>

      <label className="mb-0 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition">
        <span className="text-blue-600 font-semibold mb-2">
          {`🎵 Cliquez pour sélectionner une musique`}
        </span>
        <input
          type="file"
          accept="audio/*"
          onChange={handleMusicChange}
          className="hidden"
        />
      </label>
      {error && <small className="text-red-400">{error}</small>}

      {/* Preview */}
      {typeof updateForm === "function" &&
        // This check is just to avoid TS error, actual preview logic below
        null}
      {/* Afficher un aperçu si une musique est sélectionnée */}
      {("music" in (updateForm as any)
        ? (updateForm as any).music
        : undefined) || undefined}
      {/* Correction: Use the data prop to access the selected music */}
      {Boolean(data.music) && (
        <div className="mt-4 flex flex-col items-center">
          <span className="text-gray-700 font-medium mb-2">
            Fichier sélectionné :
          </span>
          <span className="text-blue-700 text-sm mb-2">{data.music?.name}</span>
          <audio
            controls
            src={data.music ? URL.createObjectURL(data.music) : undefined}
            className="w-full"
          >
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          className="px-6 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          Précédent
        </button>
        <button
          onClick={() => {
            if (!data?.music) {
              setError("La musique est obligatoire !");
              return;
            }

            next();
          }}
          className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step3;
