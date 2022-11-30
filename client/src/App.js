import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Ostatní Routy
import Layout from './bricks/layout';
// Core Routy
import Home from './core/home';
import AvailableSubjects from './core/availableSubjects';
import AvailableRuns from './core/availableRuns';
import SubjectInfo from './core/subjectInfo';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/available-subjects" element={<AvailableSubjects />} />
            <Route path="/available-runs" element={<AvailableRuns />} />
            <Route path="/subject" element={<SubjectInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
