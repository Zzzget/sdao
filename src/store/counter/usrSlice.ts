import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LoginInterface } from '../../api/user';

// 定义 slice state 的类型
export interface CounterState {
  token: String;
  user: Object;
}

interface userLoginFace {
  token: String;
  data: object;
}

// 使用该类型定义初始 state
const initialState: CounterState = {
  token: '',
  user: {},
};

export const userLogin: any = createAsyncThunk('user/userLogin', async (value: Object) => {
  try {
    const res = await LoginInterface(value);
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const userSlice = createSlice({
  name: 'userSlice',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.fulfilled](state, { payload }: PayloadAction<userLoginFace>) {
      state.token = payload.token;
      state.user = payload.data;
    },
    [userLogin.pending](state) {
      console.log('pending');
    },
    [userLogin.reject](state) {
      console.log('reject');
    },
  },
});

// export const { setUser } = userSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export default userSlice.reducer;
