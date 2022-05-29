import { useLocation } from "react-router-dom";
import { atom, selector } from "recoil";

export const activeMenuState = atom({
  key: "activeMenuState",
  default: selector({
    key: "activeMenuSelector",
    get: () => {
      const { pathname } = useLocation();
      return pathname;
    },
  }),
});
