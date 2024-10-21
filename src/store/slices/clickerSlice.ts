import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClickerState {
    money: number
    clickPower: number
}

const initialState: ClickerState = {
    money: 0,
    clickPower: 1
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
        }
    }
})

export default clickerSlice.reducer
export const { setMoney, setClickPower } = clickerSlice.actions
export const selectMoney = (state: {clicker: ClickerState}) => state.clicker.money
export const selectClickPower = (state: {clicker: ClickerState}) => state.clicker.clickPower