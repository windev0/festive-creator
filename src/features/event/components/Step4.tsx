import type { FormDataType } from "@/features/event/components/CreateEventForm";

type Props = {
  next: () => void;
  prev: () => void;
  data: FormDataType;
  updateForm: (updates: Partial<FormDataType>) => void;
};

const Step4 = ({ next, prev, data, updateForm }: Props) => {
  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Ajoutez un message personnalisé
      </h2>
      <textarea
        value={data.message}
        onChange={(e) => updateForm({ message: e.target.value })}
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg h-32 resize-none transition"
        placeholder="Ex : Joyeux anniversaire Alex !"
      />

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          className="px-6 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg font-medium shadow hover:bg-gray-300 transition"
        >
          Précédent
        </button>
        <button
          onClick={next}
          className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step4;
