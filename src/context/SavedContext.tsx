import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedContextType {
  savedColleges: string[]; // college IDs
  compareColleges: string[]; // college IDs (max 3)
  toggleSaveCollege: (id: string) => void;
  isSaved: (id: string) => boolean;
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
  savedComparisons: string[][]; // Array of arrays of college IDs that are saved comparisons
  saveComparison: (ids: string[]) => void;
  deleteSavedComparison: (index: number) => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [compareColleges, setCompareColleges] = useState<string[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<string[][]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedSaved = localStorage.getItem('cf_saved');
    const storedCompare = localStorage.getItem('cf_compare');
    const storedSavedComparisons = localStorage.getItem('cf_saved_comparisons');

    if (storedSaved) setSavedColleges(JSON.parse(storedSaved));
    if (storedCompare) setCompareColleges(JSON.parse(storedCompare));
    if (storedSavedComparisons) setSavedComparisons(JSON.parse(storedSavedComparisons));
  }, []);

  const toggleSaveCollege = (id: string) => {
    setSavedColleges((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('cf_saved', JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (id: string) => savedColleges.includes(id);

  const addToCompare = (id: string): boolean => {
    if (compareColleges.includes(id)) {
      return false;
    }
    if (compareColleges.length >= 3) {
      return false; // Limit reached
    }
    const updated = [...compareColleges, id];
    setCompareColleges(updated);
    localStorage.setItem('cf_compare', JSON.stringify(updated));
    return true;
  };

  const removeFromCompare = (id: string) => {
    const updated = compareColleges.filter((item) => item !== id);
    setCompareColleges(updated);
    localStorage.setItem('cf_compare', JSON.stringify(updated));
  };

  const clearCompare = () => {
    setCompareColleges([]);
    localStorage.removeItem('cf_compare');
  };

  const isComparing = (id: string) => compareColleges.includes(id);

  const saveComparison = (ids: string[]) => {
    if (ids.length < 2) return;
    setSavedComparisons((prev) => {
      // Check if comparison already exists
      const exists = prev.some(
        (comp) => comp.length === ids.length && comp.every((id) => ids.includes(id))
      );
      if (exists) return prev;

      const updated = [ids, ...prev];
      localStorage.setItem('cf_saved_comparisons', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSavedComparison = (index: number) => {
    setSavedComparisons((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('cf_saved_comparisons', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SavedContext.Provider
      value={{
        savedColleges,
        compareColleges,
        toggleSaveCollege,
        isSaved,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        savedComparisons,
        saveComparison,
        deleteSavedComparison
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
