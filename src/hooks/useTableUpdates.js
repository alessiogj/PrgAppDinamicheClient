import { useCallback } from 'react';

export function useTableUpdates(
  handleConfirmEdit,
  handleConfirmDelete,
  handleConfirmAdd,
  onUpdate,
  setShowTable
) {
  const handleConfirmEditWithUpdate = useCallback(async () => {
    await handleConfirmEdit();
    onUpdate();
    setShowTable(true);
  }, [handleConfirmEdit, onUpdate, setShowTable]);

  const handleConfirmDeleteWithUpdate = useCallback(async () => {
    await handleConfirmDelete();
    onUpdate();
    setShowTable(true);
  }, [handleConfirmDelete, onUpdate, setShowTable]);

  const handleConfirmAddWithUpdate = useCallback(async () => {
    await handleConfirmAdd();
    onUpdate();
    setShowTable(true);
  }, [handleConfirmAdd, onUpdate, setShowTable]);

  return {
    handleConfirmEditWithUpdate,
    handleConfirmDeleteWithUpdate,
    handleConfirmAddWithUpdate,
  };
}
