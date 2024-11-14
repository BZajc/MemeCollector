import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClickerState {
    money: number;
    clickPower: number;
    doubleClickChance: number;
    criticalClickChance: number;
    criticalClickMultiplier: number;
}

const initialState: ClickerState = {
    money: 500,
    clickPower: 1,
    doubleClickChance: 0,
    criticalClickChance: 0,
    criticalClickMultiplier: 1,
}

const clickerSlice = createSlice({
    name: 'clicker',
    initialState,
    reducers: {
        setMoney: (state, action: PayloadAction<number>) => {
            state.money = action.payload
        },
        setClickPower: (state, action: PayloadAction<number>) => {
            state.clickPower = action.payload
        },
        setDoubleClickChance: (state, action: PayloadAction<number>) => {
            state.doubleClickChance = action.payload;
        },
        setCriticalClickChance: (state, action: PayloadAction<number>) => {
            state.criticalClickChance = action.payload;
        },
        setCriticalClickMultiplier: (state, action: PayloadAction<number>) => {
            state.criticalClickMultiplier = action.payload;
        },
        resetClickerState: (state) => {
            state.money = 0
            state.clickPower = 1
            state.doubleClickChance = 0
            state.criticalClickChance = 0
            state.criticalClickMultiplier = 1
        }
    }
})

export default clickerSlice.reducer
export const { 
    setMoney,
    setClickPower,
    setDoubleClickChance,
    setCriticalClickChance,
    setCriticalClickMultiplier,
    resetClickerState
} = clickerSlice.actions
export const selectMoney = (state: {clicker: ClickerState}) => state.clicker.money
export const selectClickPower = (state: {clicker: ClickerState}) => state.clicker.clickPower
export const selectDoubleClickChance = (state: {clicker: ClickerState}) => state.clicker.doubleClickChance
export const selectCriticalClickChance = (state: {clicker: ClickerState}) => state.clicker.criticalClickChance
export const selectCriticalClickMultiplier = (state: {clicker: ClickerState}) => state.clicker.criticalClickMultiplier