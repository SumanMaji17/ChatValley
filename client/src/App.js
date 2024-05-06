import { StateProvider } from "./context/StateContext";
import reducer, { initialSatate } from "./context/StateReducers";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Index from "./pages/Index"
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Logout from "./pages/Logout";
function App() {
  return (
    <StateProvider initialState={initialSatate} reducer={reducer}>
      <Router>
      <div>
        <section>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/logout" element={<Logout />} />
            <Route path="/onboarding" element={<Onboarding/>}/>
            <Route path="/" element={<Index />}/>
          </Routes>
        </section>
      </div>
    </Router>
    </StateProvider>
    
      
  );
}

export default App;
