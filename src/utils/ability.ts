import { AbilityBuilder, AbilityClass, Ability } from "@casl/ability";

type Actions = "view" | "edit" | "delete" | "approve";
type Subjects =
  | "admin-dashboard"
  | "owner-dashboard"
  | "books"
  | "admin-links"
  | "owner-links"
  | "all";

export type AppAbility = Ability<[Actions, Subjects]>;

type UserType = "admin" | "owner" | "guest"; // Define allowed user types

export default function defineAbility(userType: UserType): AppAbility {
  const { can, cannot, build } = new AbilityBuilder(
    Ability as AbilityClass<AppAbility>
  );

  if (userType === "admin") {
    can("view", "admin-dashboard");
    can("approve", "books");
    can("view", "admin-links"); // On sidebar
  } else if (userType === "owner") {
    can("view", "owner-dashboard");
    can("edit", "books");
    can("delete", "books");
    can("view", "owner-links"); // On sidebar
  } else {
    cannot("view", "all");
    cannot("edit", "all");
    cannot("delete", "all");
    cannot("approve", "all");
  }

  return build();
}
