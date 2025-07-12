import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type TitleModalProps = {
  title?: string;
  selectedEventCategory?: string;
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  examples: string[];
  onTitleSelect: (example: string) => void;
};

const TitleModal = ({
  title,
  selectedEventCategory,
  examples,
  open,
  setOpen,
  onTitleSelect: onExampleSelect,
}: TitleModalProps) => {
  const [typeTitle, setTypeTitle] = useState(false);

  useEffect(() => {
    if (title && !examples.includes(title)) {
      setTypeTitle(true);
    }
  }, [title, onExampleSelect]);

  const handleTitleSelect = (example: string) => {
    onExampleSelect(example);
  };

  const handleCancel = () => {
    setTypeTitle(false);
    if (setOpen) setOpen(false);
    return;
  };
  return (
    <>
      <div className="overflow-scroll">
        <AlertDialog open={open}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Choisissez un titre d'événement: {"   "}
                <Badge color="blue">
                  {selectedEventCategory?.toUpperCase() || "votre événement"}
                </Badge>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cliquez sur un exemple pour sélectionner le titre de votre
                événement.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 my-4 overflow-y-scroll">
              {examples.map((example, index) => {
                const isSelectedStyle =
                  title === example
                    ? "bg-green-100 text-primary"
                    : "bg-gray-100 text-primary";
                return (
                  <Button
                    key={index}
                    disabled={typeTitle}
                    variant="outline"
                    color={`primary`}
                    className={`w-full justify-start ${isSelectedStyle} `}
                    onClick={() => handleTitleSelect(example)}
                  >
                    <span className="wrap-normal">{example}</span>
                  </Button>
                );
              })}
              <p>Ou</p>
              <div className="flex items-center mt-3 gap-3">
                <Checkbox
                  id="title"
                  checked={typeTitle}
                  onCheckedChange={(value) => {
                    setTypeTitle(value === true);
                    return value;
                  }}
                />
                <Label htmlFor="title">Saisir</Label>
                {typeTitle && (
                  <>
                    <Input
                      type="text"
                      defaultValue={title}
                      placeholder="Entrez votre titre personnalisé"
                      className="input input-bordered w-full"
                      onChange={(e) => handleTitleSelect(e.target.value)}
                    />
                  </>
                )}
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction disabled={!title} onClick={handleCancel}>
                Continuer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default TitleModal;
