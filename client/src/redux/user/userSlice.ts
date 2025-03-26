import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../model/userModel';



const initialState: User = {
  _id: '',
  fullName: '',
  email: '',
  password: '',
  phoneNumber: '',
  aiData: '',
  workExperience: '',
  isHiring: false,
  isCandidate: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state._id = action.payload._id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phoneNumber = action.payload.phoneNumber;
      state.aiData = action.payload.aiData;
      state.workExperience = action.payload.workExperience;
      state.isCandidate = action.payload.isCandidate;
      state.isHiring = action.payload.isHiring;
    },
    clearUser: (state) => {
      state._id = '';
      state.fullName = '';
      state.email = '';
      state.password = '';
      state.phoneNumber = '';
      state.aiData = '';
      state.workExperience = '';
      state.isCandidate = false;
      state.isHiring = false;
    },
  },
})

export const { setUser, clearUser } = userSlice.actions;

export const userSelector = (state: { user: User }) => state.user;

export default userSlice.reducer
