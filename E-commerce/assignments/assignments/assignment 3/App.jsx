import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "../src/Storage";

import PageOne from "./PageOne";
import PageTwo from "./PageTwo";
import PageThree from "./PageThree";

function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <Routes>
          <Route path="/" element={<PageOne />} />
          <Route path="/list" element={<PageTwo />} />
          <Route path="/details/:id" element={<PageThree />} />
        </Routes>
      </ProfileProvider>
    </BrowserRouter>
  );
}

export default App;
