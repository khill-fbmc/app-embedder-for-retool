import { useExtensionState } from "./useExtensionState";

export function useEditMode() {
  const isEditing = useExtensionState((s) => s.isEditing);
  const setEditMode = useExtensionState((s) => s.setEditMode);
  const startEditMode = () => setEditMode(true);
  const endEditMode = () => setEditMode(false);
  return { isEditing, setEditMode, startEditMode, endEditMode };
}
