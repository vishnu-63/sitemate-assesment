import './App.css';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import CreateIssue from './components/CreateIssue';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewIssue from './components/Viewissue';
import UpdateIssue from './components/UpdateIssue';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateIssue />} />
        <Route path="/update-issue/:id" element={<UpdateIssue />} />
        <Route path="/issue/:id" element={<ViewIssue />} />  
      </Routes>
    </BrowserRouter>
          
  );
}

export default App;
