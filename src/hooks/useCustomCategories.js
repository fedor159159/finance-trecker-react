import { useState, useEffect } from "react";

const STORAGE_KEY = "finance-tracker-custom-categories";

const getInitial = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Ошибка чтения custom categories:", error);
      return [];
    }
  }
  return [];
};

const useCustomCategories = () => {
  const [customCategories, setCustomCategories] = useState(getInitial);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customCategories));
  }, [customCategories]);

  const addCustomCategory = (value) => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return;
    setCustomCategories((prev) => {
      if (prev.some((c) => c.value === normalized)) return prev;
      return [
        ...prev,
        {
          value: normalized,
          label: normalized.charAt(0).toUpperCase() + normalized.slice(1),
        },
      ];
    });
  };

  const deleteCustomCategory = (value) => {
    setCustomCategories((prev) => prev.filter((c) => c.value !== value));
  };

  return { customCategories, addCustomCategory, deleteCustomCategory };
};

export default useCustomCategories;
