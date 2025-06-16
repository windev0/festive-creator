import type { FormDataType } from "@/features/event/components/CreateEventForm";

type Props = {
  next: () => void;
  data: FormDataType;
  updateForm: (updates: Partial<FormDataType>) => void;
};

const Step1 = ({ next, data, updateForm }: Props) => {
  const handleSubmitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const duration = formData.get("duration") as string;
    const category = formData.get("category") as string;

    if (!title && !duration && !category) {
      return;
    }
    next();
  };
  return (
    <form action="" onSubmit={handleSubmitStep1}>
      <div className="w-full max-w-md mx-auto space-y-8 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6 tracking-tight">
          Créer un message festif
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            required
            name="title"
            placeholder="Titre (ex: Mon 45 ième Anniversaire)"
            value={data.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition placeholder-gray-400 text-base"
          />

          <select
            required
            name="category"
            value={data.category}
            onChange={(e) => updateForm({ category: e.target.value })}
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition bg-white text-gray-700 text-base"
          >
            <option value="">Sélectionner un type</option>
            <option value="anniversaire">Anniversaire</option>
            <option value="félicitations">Félicitations</option>
            <option value="naissance">Naissance</option>
          </select>

          <select
            name="duration"
            required
            value={data.duration}
            onChange={(e) => updateForm({ duration: e.target.value })}
            className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg outline-none transition bg-white text-gray-700 text-base"
          >
            <option value="">Durée</option>
            <option value="30s">30s</option>
            <option value="1min">1 min</option>
            <option value="2min">2 min</option>
          </select>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
          >
            Suivant
          </button>
        </div>
      </div>
    </form>
  );
};

export default Step1;
