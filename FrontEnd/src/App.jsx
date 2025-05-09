// import "@fontsource/lato";
// import "./styles/variables.css";
// import "./styles/classes.css";
// import "./styles/global.css";
// import Login from "./pages/auth/Login";
// import Signup from "./pages/auth/Signup";
// import MainLayout from "./layouts/MainLayout/MainLayout";
// import EmptyLayout from "./layouts/MainLayout/EmptyLayout";
// import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
// import DmPage from "./pages/dashboard/DmPage";
// import { Routes, Route } from "react-router-dom";
// import ChannelPage from "./pages/dashboard/ChannelPage";

// import ProtectedRoute from "./components/Auth/ProtectedRoute";
// import Landing from "./pages/dashboard/Landing/Landing";

// import Step1 from "./pages/dashboard/CreateWorkspace/Step1";
// import Step2 from "./pages/dashboard/CreateWorkspace/Step2";
// import Step3 from "./pages/dashboard/CreateWorkspace/Step3";

// function App() {
//   return (
//     <div className="app__body">
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/landing"
//           element={
//             <ProtectedRoute>
//               <Landing />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <MainLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dm/:id" element={<DmPage />} />
//           <Route path="channels/:id" element={<ChannelPage />} />
//           <Route path="browse-channels" element={<BrowseChannels />} />
//         </Route>
//         <Route
//           path="/create-workspace"
//           element={
//             <ProtectedRoute>
//               <EmptyLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="step-1" element={<Step1 />} />
//           <Route path="step-2" element={<Step2 />} />
//           <Route path="step-3" element={<Step3 />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MainLayout from "./layouts/MainLayout/MainLayout";
import EmptyLayout from "./layouts/MainLayout/EmptyLayout";
import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
import DmPage from "./pages/dashboard/DmPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import ChannelPage from "./pages/dashboard/ChannelPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Landing from "./pages/dashboard/Landing/Landing";

import Step1 from "./pages/dashboard/CreateWorkspace/Step1";
import Step2 from "./pages/dashboard/CreateWorkspace/Step2";
import Step3 from "./pages/dashboard/CreateWorkspace/Step3";

function App() {
  const [teamName, setTeamName] = useState("");
  const [userName, setUserName] = useState("");
  // const [emails, setEmails] = useState("");
  const navigate = useNavigate();

  return (
    <div className="app__body">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/landing"
          element={
            <ProtectedRoute>
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dm/:id" element={<DmPage />} />
          <Route path="channels/:id" element={<ChannelPage />} />
          <Route path="browse-channels" element={<BrowseChannels />} />
        </Route>

        {/* Create Workspace Flow */}
        <Route
          path="/create-workspace"
          element={
            <ProtectedRoute>
              <EmptyLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="step-1"
            element={
              <Step1
                onNext={(name) => {
                  setTeamName(name);
                  navigate("/create-workspace/step-2");
                }}
              />
            }
          />
          <Route
            path="step-2"
            element={
              <Step2
                onNext={(name) => {
                  setUserName(name);
                  navigate("/create-workspace/step-3");
                }}
              />
            }
          />
          <Route
            path="step-3"
            element={
              <Step3
                teamName={teamName}
                onNext={(enteredEmails) => {
                  // setEmails(enteredEmails);
                  // Navigate or finalize process here
                  console.log("Final Submission ✅", {
                    teamName,
                    userName,
                    emails: enteredEmails,
                  });
                  navigate("/landing");
                }}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
