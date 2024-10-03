// Define a type for the Colors object (optional, but provides strong typing)
export type ColorsType = {
    red: number;
    orange: number;
    white: number;
    brown: number;
    brownDark: number;
    pink: number;
    yellow: number;
    blue: number;
    lightPurple: number;
  };
  
  // Colors object with hexadecimal values
  export const Colors: ColorsType = {
    red: 0xf25346,
    orange: 0xffa500,
    white: 0xd8d0d1,
    brown: 0x59332e,
    brownDark: 0x23190f,
    pink: 0xf5986e,
    yellow: 0xf4ce93,
    blue: 0x68c3c0,
    lightPurple: 0xc8a2c8,
  };
  
  // Named exports for specific game elements
  export const COLOR_COINS: number = 0xffd700;
  export const COLOR_COLLECTIBLE_BUBBLE: number = COLOR_COINS;
  export const COLOR_SEA_LEVEL: number[] = [
    0x68c3c0, // hsl(178deg 43% 59%)
    0x47b3af, // hsl(178deg 43% 49%)
    0x398e8b, // hsl(178deg 43% 39%)
    0x2a6a68, // hsl(178deg 43% 29%)
    0x1c4544, // hsl(178deg 43% 19%)
    0x0d2120, // hsl(178deg 43% 09%)
  ];
  
  // Default export of the Colors object
  export default Colors;
  