import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "../components/HomePagesContainer";
import { ViewSpot } from "../components/ViewSpot";
import { EditSpot } from "../components/EditSpot";
import { EditReview } from "../components/EditReview";
import NewSpot from "../components/SpotForm";

export default function Routing() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ViewSpot" element={<ViewSpot />} />
        <Route path="/EditSpot/:id" element={<EditSpot />} />
        <Route path="/NewSpot" element={<NewSpot />} />
        <Route path="/EditReview/:id" element={<EditReview />} />
      </Routes>
    </Suspense>
  );
}
