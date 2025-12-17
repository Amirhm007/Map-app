import React from "react";
import Sidebar from "../component/Sidebar.jsx";
import Map from "../component/Map.jsx";

function App() {
  return (
    <div className="h-screen p-3 overscroll-y-none flex relative">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
