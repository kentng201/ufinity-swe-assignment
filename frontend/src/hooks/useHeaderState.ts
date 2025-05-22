import React from "react";

export function useHeaderStateContext() {
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState<'classes' | 'teachers' | undefined>();

  return {
    loading,
    setLoading,
    active,
    setActive,
  };
}

export const HeaderStateContext = React.createContext<ReturnType<typeof useHeaderStateContext> | null>(null);

export function useHeaderState() {
  const context = React.useContext(HeaderStateContext);
  if (!context) {
    throw new Error("useHeaderState must be used within a HeaderStateProvider");
  }
  return context;
}