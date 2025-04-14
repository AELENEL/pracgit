import React, { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../store/Store";
interface IREDUX {
  children: React.ReactNode;
}
const ReduxProvider: FC<IREDUX> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
