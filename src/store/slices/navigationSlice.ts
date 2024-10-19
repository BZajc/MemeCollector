import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
    expandedNav: boolean;
}

const initialState: NavigationState = {
    expandedNav: false
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setExpandedNav: (state, action: PayloadAction<boolean>) => {
            state.expandedNav = action.payload
        }
    }
})

export default navigationSlice.reducer
export const { setExpandedNav } = navigationSlice.actions
export const selectExpandedNav = (state: {navigation: NavigationState}) => state.navigation.expandedNav