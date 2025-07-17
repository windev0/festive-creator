import React, { useState } from "react";

import {
  eventCategories,
  eventTitleExamples,
} from "@/features/events/utils/constants";

const TitleModal = React.lazy(() => import("@/features/events/create-event/components/TitleModal"));

type EventCategorySelectorProps = {
  selectedEventCategory: string;
  onEventCategorySelect: (eventCategory: string) => void;
  title?: string;
  onEventTitle: (eventTitle: string) => void;
};

const EventCategorySelector = ({
  title,
  selectedEventCategory,
  onEventCategorySelect,
  onEventTitle,
}: EventCategorySelectorProps) => {
  // const [titleExamples, setTitleExamples] = useState<string[]>([]);
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choisissez votre catégorie d'événement
        </h2>
        <p className="text-muted-foreground">
          Sélectionnez la catégorie de célébration pour personnaliser votre
          événement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventCategories.map((eventCategory) => (
          <button
            key={eventCategory.id}
            onClick={() => {
              const category = eventCategory.id;
              onEventCategorySelect(category);
              setOpen(true);
            }}
            className={`p-6 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              selectedEventCategory === eventCategory.id
                ? `${eventCategory.borderColor} ${eventCategory.bgColor} shadow-md`
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`w-16 h-16 rounded-full ${eventCategory.color} flex items-center justify-center`}
              >
                <eventCategory.icon size={32} color="white" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                  {eventCategory.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {eventCategory.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal for title selection */}
      {selectedEventCategory && (
        <TitleModal
          selectedEventCategory={selectedEventCategory}
          examples={eventTitleExamples[selectedEventCategory] || []}
          title={title}
          onTitleSelect={onEventTitle}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

export default EventCategorySelector;
