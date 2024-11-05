import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpgradesState {
    filterByAffordable: boolean;
    filterByCheapest: boolean;
    filterBySelectedTypes: string[];
}

const initialState: UpgradesState = {
    filterByAffordable: false,
    filterByCheapest: false,
    filterBySelectedTypes: []
}

const upgradesSlice = createSlice({
    name: "upgrades",
    initialState,
    reducers: {
        setFilterByAffordable: (state, action: PayloadAction<boolean>) => {
            state.filterByAffordable = action.payload
        },
        setFilterByCheapest: (state, action: PayloadAction<boolean>) => {
            state.filterByCheapest = action.payload
        },
        // Filter by only selected types as active
        setToggleSelectedTypes: (state, action: PayloadAction<string>) => {
            const type = action.payload
            if (state.filterBySelectedTypes.includes(type)) {
                state.filterBySelectedTypes = state.filterBySelectedTypes.filter(t => t !== type)
            } else {
                state.filterBySelectedTypes.push(type)
            }
        },
        // Filter by all types available
        setSelectAllTypes: (state, action: PayloadAction<string[]>) => {
            state.filterBySelectedTypes = action.payload
        }
    }
})

export default upgradesSlice.reducer
export const { setFilterByAffordable, setFilterByCheapest, setToggleSelectedTypes, setSelectAllTypes } = upgradesSlice.actions
export const selectFilterByAffordable = (state: {upgrades: UpgradesState}) => state.upgrades.filterByAffordable
export const selectFilterByCheapest = (state: {upgrades: UpgradesState}) => state.upgrades.filterByCheapest
export const selectFilterBySelectedTypes = (state: {upgrades: UpgradesState}) => state.upgrades.filterBySelectedTypes