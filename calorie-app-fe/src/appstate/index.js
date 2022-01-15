import { createSlice, configureStore   } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'calorie',
  initialState: {
    user : {},
    food : [],
    admin: {
      users: [],
      currUser: {},
      food: [],
      report: {}
    },
    component: {
      inviteFriendModal: false,
      foodProductEditModal: false,
      foodProductAddModal: false
    }
  },
  reducers: {
    userReducer: (state, action) => {
      state.user = action.payload
    },
    foodReducer: (state, action) => {
      state.food = action.payload
    },
    inviteFriendReducer: (state, action) => {
      state.component.inviteFriendModal = action.payload
    },
    adminUsersReducer: (state, action) => {
      state.admin.users = action.payload
    },
    adminCurrUserReducer: (state, action) => {
      state.admin.currUser = action.payload
    },
    adminFoodReducer: (state, action) => {
      state.admin.food = action.payload
    },
    adminReportReducer: (state, action) => {
      state.admin.report = action.payload
    },
    foodProductModalReducer: (state, action) => {
      state.component.foodProductEditModal = action.payload
    },
    foodProductAddModalReducer: (state, action) => {
      state.component.foodProductAddModal = action.payload
    }
  }
})

export const { userReducer, foodReducer, inviteFriendReducer, 
  adminUsersReducer, adminCurrUserReducer, adminFoodReducer,
  foodProductModalReducer, adminReportReducer, foodProductAddModalReducer } = slice.actions

export const store = configureStore({
  reducer: slice.reducer
})

// store.subscribe(() => console.log(store.getState()))