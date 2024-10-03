// hooks/useMounted.ts
import React from "react";

export const useMounted = (): boolean => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
};
