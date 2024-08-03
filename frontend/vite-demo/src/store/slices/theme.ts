import { createSlice } from "@reduxjs/toolkit";
import { globalConfig } from "@/globalConfig";

// 先从localStorage里获取主题配置
const sessionTheme = JSON.parse(
  window.localStorage.getItem(globalConfig.SESSION_LOGIN_THEME) || "{}"
);

// 如果localStorage里没有主题配置，则使用globalConfig里的初始化配置
const initTheme =
  sessionTheme || sessionTheme !== "{}" ? sessionTheme : globalConfig.initTheme;

document.getElementsByTagName("html")[0].className = initTheme.dark
  ? "dark"
  : "";

//该store分库的初始值
const initialState = {
  dark: initTheme.dark,
  colorPrimary: initTheme.colorPrimary,
};

export const themeSlice = createSlice({
  // store分库名称
  name: "theme",
  // store分库初始值
  initialState,
  reducers: {
    // redux方法：设置亮色/暗色主题
    setDark: (state, action) => {
      // 目前理解的action是包含传递的值的对象
      // 修改了store分库里dark的值（用于让全项目动态生效）
      state.dark = action.payload;
      // 更新localStorage的主题配置（用于长久保存主题配置）
      window.localStorage.setItem(
        globalConfig.SESSION_LOGIN_THEME,
        JSON.stringify(state)
      );
      document.getElementsByTagName("html")[0].className = state.dark
        ? "dark"
        : "";
    },
    // redux方法：设置主题色
    setColorPrimary: (state, action) => {
      // 修改了store分库里colorPrimary的值（用于让全项目动态生效）
      state.colorPrimary = action.payload;
      // 更新localStorage的主题配置（用于长久保存主题配置）
      window.localStorage.setItem(
        globalConfig.SESSION_LOGIN_THEME,
        JSON.stringify(state)
      );
    },
  },
});

// 将setDark和setColorPrimary方法抛出
export const { setDark, setColorPrimary } = themeSlice.actions;

export default themeSlice.reducer;
