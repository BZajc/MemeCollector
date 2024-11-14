import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card } from "../../data/cardsConfig";

interface CollectionState {
  cards: Card[];
}

const initialState: CollectionState = {
  cards: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setAddCard: (state, action: PayloadAction<Card[]>) => {
      action.payload.forEach((newCard) => {
        // Checking for duplicates
        const cardExists = state.cards.some(card => card.id === newCard.id);
        if (!cardExists) {
          state.cards.push(newCard);
        }
      });
    },
    resetCards: (state) => {
      state.cards = []
    }
  },
});

export default collectionSlice.reducer;
export const { setAddCard, resetCards } = collectionSlice.actions;
export const selectCards = (state: { collection: CollectionState }) => state.collection.cards;
