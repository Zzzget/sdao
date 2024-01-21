import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { findCate } from '../../api/cate';

// 定义 slice state 的类型
interface CateState {
  name: String;
}

// 使用该类型定义初始 state
const initialState: CateState = {
  name: '',
};

export const fendCate: any = createAsyncThunk('cate/fendCate', async () => {
  try {
    const res = await findCate();
    return res.data;
  } catch (err) {
    throw err;
  }
});

export const cateSlice = createSlice({
  name: 'commSlice',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {},
  extraReducers: {
    [fendCate.fulfilled](state, { payload }) {
      state.name = payload;
    },
    [fendCate.pending](state) {
      console.log('pending');
    },
    [fendCate.reject](state) {
      console.log('reject');
    },
  },
});

// export const { setUser } = userSlice.actions;

// selectors 等其他代码可以使用导入的 `RootState` 类型
export default cateSlice.reducer;
