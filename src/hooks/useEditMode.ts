import { useExtensionState } from "./useExtensionState";

export function useEditMode() {
  const [isEditing, setEditMode] = useExtensionState((s) => [
    s.isEditing,
    s.setEditMode,
  ]);
  const startEditMode = () => setEditMode(true);
  const endEditMode = () => setEditMode(false);
  return { isEditing, setEditMode, startEditMode, endEditMode };
}
