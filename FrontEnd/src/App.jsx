// import "@fontsource/lato";
// import "./styles/variables.css";
// import "./styles/classes.css";
// import "./styles/global.css";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// // import MainLayout from "./layouts/MainLayout/MainLayout";
// // import BrowseChannels from "./pages/dashboard/BrowseChannels/BrowseChannels";
// // import DmPage from "./pages/dashboard/DmPage";
// // import ChannelPage from "./pages/dashboard/ChannelPage";
// import { Routes, Route } from "react-router-dom";
// import WorkspaceLanding from "./pages/WorkspaceCreation/WorkspaceLanding/WorkspaceLanding";
// import CreateWorkspace from "./pages/WorkspaceCreation/CreateWorkspace";
// import { WorkspaceProvider } from "./contexts/WorkspaceContext";
// function App() {
//   return (
//     <div className="app__body">
//       <WorkspaceProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {/* <Route path="/" element={<MainLayout />}>
//           <Route path="dm/:id" element={<DmPage />} />
//           <Route path="channels/:id" element={<ChannelPage />} />
//           <Route path="browse-channels" element={<BrowseChannels />} />
//           </Route> */}
//           <Route path="/" element={<WorkspaceLanding />} />
//           <Route path="/create-workspace" element={<CreateWorkspace />} />
//         </Routes>
//       </WorkspaceProvider>
//     </div>
//   );
// }

// export default App;

import "@fontsource/lato";
import "./styles/variables.css";
import "./styles/classes.css";
import "./styles/global.css";
import { useState } from "react";
import Step1 from "./pages/WorkspaceCreation/WorkspaceCreationSteps/Step1";
import Step2 from "./pages/WorkspaceCreation/WorkspaceCreationSteps/Step2";
import Step3 from "./pages/WorkspaceCreation/WorkspaceCreationSteps/Step3";

const App = () => {
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState("");
  const [teamName, setTeamName] = useState("");

  const handleNext = () => setStep((prev) => prev + 1);

  return (
    <div>
      {step === 1 && (
        <Step1
          workspaceName={workspaceName}
          setWorkspaceName={setWorkspaceName}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <Step2
          teamName={teamName}
          setTeamName={setTeamName}
          onNext={handleNext}
        />
      )}
      {step === 3 && <Step3 teamName={teamName} onNext={handleNext} />}
    </div>
  );
};

export default App;
