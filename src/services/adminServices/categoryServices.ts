import { CategoryStatsResponse } from "@/Types/types";
import axios from "@/utils/axios";
export async function GET_CATEGORY_STATS_ADMIN() {
  const res = await axios("/categories/countBooks", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return (res.data as CategoryStatsResponse).count;
}
