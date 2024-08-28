import { Ability, createMongoAbility, RawRuleOf } from "@casl/ability";
type Actions = "read" | "edit" | "delete" | "approve" | "create" | "manage";
type Subjects =
  | "all"
  | "owner"
  | "OwnerToBooks"
  | "Transactions"
  | "Owners"
  | "AdminDashboard"
  | "OwnerDashboard";

export type AppAbility = Ability<[Actions, Subjects]>;

export const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  createMongoAbility<AppAbility>(rules);
