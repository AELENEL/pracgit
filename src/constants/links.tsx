import AdminPages from "../components/pages/AdminPages";
import ListPages from "../components/pages/ListPages";
export const links = [
  {
    link: "/admin",
    title: "admin",
    el: <AdminPages />,
  },
  {
    link: "/list",
    title: "list",
    el: <ListPages />,
  },
];
