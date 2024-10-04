type ClassValue = string | undefined | null | { [key: string]: boolean };

export function cn(...classes: ClassValue[]): string {
  return classes
    .map((c) => {
      if (typeof c === "string") return c;
      if (typeof c === "object" && c !== null) {
        return Object.entries(c)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
