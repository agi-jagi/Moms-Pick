"use client";

import { useParentingStore } from "@/store/ParentingStore";
import Nursing from "./Nursing";
import Meal from "./Meal";
import Education from "./Education";

export default function Detail() {
  const { parenting } = useParentingStore();

  return (
    <div>
      {parenting === "수유" && <Nursing />}
      {parenting === "식단" && <Meal />}
      {parenting === "교육기관" && <Education />}
    </div>
  );
}
