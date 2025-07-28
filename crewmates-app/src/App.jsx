import CrewmateSummary from './pages/CrewmateSummary';
import { Routes, Route } from 'react-router-dom';
import CreateCrewMate from './pages/CreateCrewMate';
import EditCrewmate from './pages/EditCrewmate';
import CrewmateDetail from './pages/CrewmateDetail';


function App () {
  return (
    <Routes>
      <Route path = "/" element = {<CrewmateSummary/>}/>
      <Route path = "/create" element = {<CreateCrewMate/>}/>
      <Route path = "/edit/:id" element = {<EditCrewmate/>}/>
      <Route path = "/crewmate/:id" element = {<CrewmateDetail/>}/>
    </Routes>

  )
}

export default App;