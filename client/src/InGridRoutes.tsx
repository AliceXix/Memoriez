import { Route, Routes } from "react-router-dom";
import AllMemories from "./components/allMemories";
import EditMemory from "./components/Editmemory";
import Favorites from "./components/favorites";
import MemoryDetails from "./components/memory.details";
import PersonDetails from "./components/person.details";

export default function InGridRoutes({ searchKey }: { searchKey: string }) {
  return (
    <>
        <Routes>
            <Route
				path="dashboard/:id"
				element={<AllMemories searchKey={searchKey} />}
            />
            <Route path="favorites/:id" element={<Favorites />} />
            <Route path="person-details/:id" element={<PersonDetails />} />
            <Route path="memory-details/:id" element={<MemoryDetails />} />
            <Route path="edit-memory/:id" element={<EditMemory />} />
        </Routes>
    </>
  );
}
