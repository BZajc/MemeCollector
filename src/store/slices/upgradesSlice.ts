import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { upgrades as initialUpgrades } from "../../data/upgradesConfig";
import { Upgrade } from "../../data/upgradesConfig"; // Import the Upgrade interface directly from your config

interface UpgradesState {
    filterByAffordable: boolean;
    filterByCheapest: boolean;
    filterBySelectedTypes: string[];
    availableUpgrades: Upgrade[];
}

const initialState: UpgradesState = {
    filterByAffordable: false,
    filterByCheapest: false,
    filterBySelectedTypes: [],
    availableUpgrades: initialUpgrades
}

const upgradesSlice = createSlice({
    name: "upgrades",
    initialState,
    reducers: {
        setFilterByAffordable: (state, action: PayloadAction<boolean>) => {
            state.filterByAffordable = action.payload;
        },
        setFilterByCheapest: (state, action: PayloadAction<boolean>) => {
            state.filterByCheapest = action.payload;
        },
        setToggleSelectedTypes: (state, action: PayloadAction<string>) => {
            const type = action.payload;
            if (state.filterBySelectedTypes.includes(type)) {
                state.filterBySelectedTypes = state.filterBySelectedTypes.filter(t => t !== type);
            } else {
                state.filterBySelectedTypes.push(type);
            }
        },
        setSelectAllTypes: (state, action: PayloadAction<string[]>) => {
            state.filterBySelectedTypes = action.payload;
        },
        // Update to handle both single and multiple IDs for removal
        setRemovePurchasedImprovement: (state, action: PayloadAction<string | string[]>) => {
            const idsToRemove = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.availableUpgrades = state.availableUpgrades.filter(
                upgrade => !idsToRemove.includes(upgrade.id)
            );
        }
    }
});

export default upgradesSlice.reducer;
export const {
    setFilterByAffordable,
    setFilterByCheapest,
    setToggleSelectedTypes,
    setSelectAllTypes,
    setRemovePurchasedImprovement,
} = upgradesSlice.actions;
export const selectFilterByAffordable = (state: { upgrades: UpgradesState }) => state.upgrades.filterByAffordable;
export const selectFilterByCheapest = (state: { upgrades: UpgradesState }) => state.upgrades.filterByCheapest;
export const selectFilterBySelectedTypes = (state: { upgrades: UpgradesState }) => state.upgrades.filterBySelectedTypes;
export const selectAvailableUpgrades = (state: { upgrades: UpgradesState }) => state.upgrades.availableUpgrades;
