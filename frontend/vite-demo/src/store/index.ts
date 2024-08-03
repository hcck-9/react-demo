import { configureStore } from "@reduxjs/toolkit";
// 引入主题换肤store分库
import themeReducer from "@/store/slices/theme";
import userinfoReducer from "@/store/slices/userinfo";
import codeTreeReducer from "@/store/slices/codeTree";

export const store = configureStore({
  reducer: {
    // 主题换肤store分库
    theme: themeReducer,
    userinfo: userinfoReducer,
    codeTree: codeTreeReducer,
  },
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {theme: ThemesState ... }
export type AppDispatch = typeof store.dispatch;
