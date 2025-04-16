import AdminPages from "../components/pages/AdminPages";
import HomePage from "../components/pages/HomePage";
export const links = [
  {
    link: "/admin",
    title: "admin",
    el: <AdminPages />,
  },
  {
    link: "/home",
    title: "home",
    el: <HomePage />,
  },
];
