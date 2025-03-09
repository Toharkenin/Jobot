import { useState } from 'react';
import './App.css'
import JobCandidate from './view/pages/jobCandidate/JobCandidate'
import Chat from './view/pages/chat/Chat';

// function AppRoutes() {
//   return useRoutes(routes);
// }

function App() {
  const testUserId = "67b9edaa4e2f6b7890741ce1"; // Using a test user ID for now
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div>
      {/* <h1>Jobot system</h1>
        <br />
        <Auth></Auth> */}
      <Chat />
    </div>
  )
}

export default App;
