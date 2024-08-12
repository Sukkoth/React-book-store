import { Can } from "@/Providers/AbilityProvider";
import { Outlet } from "react-router-dom";
import NoEnoughPermission from "./NoEnoughPermission";

function CASLOutlet({ type }: { type: "admin" | "owner" }) {
  return (
    <>
      <Can
        I='view'
        a={type === "admin" ? "admin-dashboard" : "owner-dashboard"}
      >
        <Outlet />
      </Can>

      <Can
        I='view'
        not
        a={type === "admin" ? "admin-dashboard" : "owner-dashboard"}
      >
        <NoEnoughPermission />
      </Can>
    </>
  );
}

export default CASLOutlet;
