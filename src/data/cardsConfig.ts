export interface Card {
    id: string;
    name: string;
    image: string;
    description: string;
    rarity: "C" | "B" | "A" | "S";
}

// const cards: Card[] = [
//     {}
// ]