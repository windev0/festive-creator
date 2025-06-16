import type { FormDataType } from "@/features/event/components/CreateEventForm";
import { useEffect, useState } from "react";

type Props = {
  next: () => void;
  prev: () => void;
  data: FormDataType;
  updateForm: (updates: Partial<FormDataType>) => void;
};

const Step2 = ({ next, prev, data, updateForm }: Props) => {
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateForm({ photos: [...data?.photos, ...Array.from(e.target.files)] });
    }
  };
  const handleSubmitStep2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data?.photos?.length <= 0) {
      setError("Veuilez choisir une ou plusieurs photos");
      return;
    }
    next();
    return;
  };
  useEffect(() => {}, [error]);

  if (!data) {
    return null;
  }
  return (
    <form action="" onSubmit={handleSubmitStep2}>
      <div className="max-w-lg mx-auto space-y-8 bg-white p-6 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Ajoutez des photos
        </h2>
        {!Array.isArray(data.photos) || data.photos.length === 0 ? (
          <>
            <label className="mb-0 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer transition hover:border-blue-600 bg-blue-50">
              <svg
                className="w-12 h-12 text-blue-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-blue-600 font-medium mb-1">
                Cliquez pour ajouter des images
              </span>
              <span className="text-xs text-gray-500">
                PNG, JPG, JPEG, GIF (max 10MB chacun)
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                name="photos"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <div>
              {error && <small className="text-red-400">{error}</small>}
            </div>
          </>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {data.photos.map((file: File, idx: number) => (
              <div key={idx} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full rounded-lg border"
                />
              </div>
            ))}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer transition hover:border-blue-600 bg-blue-50 w-24 h-24">
              <svg
                className="w-8 h-8 text-blue-400 mb-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                multiple
                name="photos"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}

        <div className="flex justify-between items-center gap-4 w-full">
          <button
            onClick={prev}
            className="px-6 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Précédent
          </button>
          <button
            type="submit"
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Suivant
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
