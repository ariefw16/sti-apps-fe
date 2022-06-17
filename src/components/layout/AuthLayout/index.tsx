import { Outlet } from "react-router-dom";
import img from "../../../assets/img/authBackground.jpg";

export default function AuthLayout() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundImage: `url(${img})`,
      }}
    >
      <Outlet />
    </div>
  );
}
