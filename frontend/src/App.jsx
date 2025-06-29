import React from "react";
import Dashboard from "./components/dashboard";
// import {getDatabase,ref,set} from "firebase/database";
// import {app} from "./firebase";
// const db = getDatabase(app);
function App() {
  return (
    <>
     <h1 className=" text-3xl font-bold text-blue-600 ml-150">
        CODEFORCES-REMAINDER
      </h1>
      <Dashboard/>
    </>
  );
}
export default App;