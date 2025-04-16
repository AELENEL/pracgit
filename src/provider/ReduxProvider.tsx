import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/Store";

interface IRedaxProvider {
  children: ReactNode;
}

const RedaxProvider: FC<IRedaxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RedaxProvider;
