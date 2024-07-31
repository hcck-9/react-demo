import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { globalConfig } from "@/globalConfig";

const loginInfo = JSON.parse(
  window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) || "{}"
);

type StateType = {
  [key: string]: any;
};

// 便捷创建 reducers
function createSetters(initialState: StateType, callback?: () => {}) {
  const reducers: {
    [key: string]: (state: StateType, action: PayloadAction<any>) => void;
  } = {};

  for (const key in initialState) {
    if (Object.prototype.hasOwnProperty.call(initialState, key)) {
      reducers[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (
        state,
        action: PayloadAction<any>
      ) => {
        state[key] = action.payload;
        if (callback) callback();
      };
    }
  }

  return reducers;
}

const initialState = {
  loginUid: loginInfo.loginUid,
  nickname: loginInfo.nickname,
  token: loginInfo.token,
  avaUrl: loginInfo.avaUrl,
};

const setters = createSetters(initialState);

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: { ...setters },
});

// 单独导出具体的 action creator
export const { setLoginUid, setNickname, setToken, setAvaUrl } =
  userInfoSlice.actions;

export default userInfoSlice.reducer;
