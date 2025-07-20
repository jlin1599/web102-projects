import {Routes, Route} from "react-router-dom"
import Dashboard from "./components/Dashboard"
import DetailView from "./components/DetailView"

function App () {
  return(
    <Routes>
      <Route path = "/" element = {<Dashboard/>} />
      <Route path = "/recipe/:id" element= {<DetailView/>}/>
    </Routes>
  )
}

export default App;