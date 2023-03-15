import { useState } from "react";
import AuthorSDKClient from "./author-sdk-client/AuthorSDKClient";
import AuthorSample from "./author/AuthorSample";

function App() {
  return (
    <div className="App">
      {/* <AuthorSample /> */}
      <AuthorSDKClient />
    </div>
  );
}

export default App;
