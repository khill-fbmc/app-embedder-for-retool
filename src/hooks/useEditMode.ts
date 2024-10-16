import { useStore } from "./useStore";

export function useEditMode() {
  const isEditing = useStore((s) => s.isEditing);
  const setEditMode = useStore((s) => s.setEditMode);
  const startEditMode = () => setEditMode(true);
  const stopEditMode = () => setEditMode(false);

  return { isEditing, setEditMode, startEditMode, stopEditMode };
}
