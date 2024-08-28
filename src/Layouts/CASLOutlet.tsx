import { Can } from "@/Providers/AbilityProvider";
import { Outlet } from "react-router-dom";
import NoEnoughPermission from "./NoEnoughPermission";

function CASLOutlet({ type }: { type: "admin" | "owner" }) {
  return (
    <>
      <Can I='read' an={type === "admin" ? "AdminDashboard" : "OwnerDashboard"}>
        <Outlet />
      </Can>

      <Can
        I='read'
        not
        an={type === "admin" ? "AdminDashboard" : "OwnerDashboard"}
      >
        <NoEnoughPermission />
      </Can>
    </>
  );
}

export default CASLOutlet;
