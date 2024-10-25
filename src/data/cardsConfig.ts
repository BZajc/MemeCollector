// Interface for a card
export interface Card {
  id: string;
  name: string;
  image: string;
  rarity: "C" | "B" | "A" | "S";
}

// Interface for a card pack
export interface CardPack {
  name: string;
  price: number;
  chances: { [key in Card['rarity']]?: number };
}

// Utility to load all images from a folder and create paths
const importAllImages = (requireContext: __WebpackModuleApi.RequireContext) => {
  const images: { [key: string]: string } = {};
  requireContext.keys().forEach((fileName) => {
    const key = fileName.replace('./', '');
    images[key] = requireContext(fileName);
  });
  return images;
};

// Helper function to format card names by removing dashes and capitalizing words
const formatFileName = (fileName: string) => {
  return fileName
    .replace(/^[a-z]-/, "")
    .replace(/\.(webp|png|jpg)$/, "")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Load images from different folders based on rarity
const aImages = importAllImages(require.context('../images/cards/a', false, /\.webp$/));
const bImages = importAllImages(require.context('../images/cards/b', false, /\.webp$/));
const cImages = importAllImages(require.context('../images/cards/c', false, /\.webp$/));
const sImages = importAllImages(require.context('../images/cards/s', false, /\.webp$/));

// Combine all images into one object
const allImages = { ...aImages, ...bImages, ...cImages, ...sImages };

// Generate card data from loaded images
const cards: Card[] = Object.keys(allImages).map((key) => {
  let rarity: "C" | "B" | "A" | "S";
  
  // Determine rarity based on the prefix of the image name
  switch (true) {
    case key.startsWith('a-'):
      rarity = "A";
      break;
    case key.startsWith('b-'):
      rarity = "B";
      break;
    case key.startsWith('c-'):
      rarity = "C";
      break;
    case key.startsWith('s-'):
      rarity = "S";
      break;
    default:
      throw new Error(`Unknown rarity prefix for file: ${key}`);
  }

  return {
    id: key.replace(/\.(webp|png|jpg)$/, ""), // Use file name without extension as `id`
    name: formatFileName(key),  // Use formatted name
    image: allImages[key],
    rarity,
  };
});

// Define card packs with chances
const cardPacks: CardPack[] = [
  {
    name: "C TIER Pack",
    price: 100,
    chances: { C: 90, B: 10 },
  },
  {
    name: "B TIER Pack",
    price: 2500,
    chances: { C: 22, B: 75, A: 3 },
  },
  {
    name: "A TIER Pack",
    price: 15000,
    chances: { B: 78, A: 25, S: 2 },
  },
  {
    name: "S TIER Pack",
    price: 100000,
    chances: { A: 85, S: 15 },
  },
];

export { cards, cardPacks };
