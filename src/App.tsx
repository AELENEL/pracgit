import { Route, Routes } from "react-router";
import { links } from "./constants/links";

const App = () => {
  return (
    <Routes>
    {links.map((link, idx) => (
      <Route key={idx} path={link.link} element={link.el} />
    ))}
  </Routes>
  );
};

export default App;