import { useState } from 'react'
import "./App.css"
import HugeUploader from "huge-uploader"

function App() {
const [progress, setProgress] = useState(0);

  const handleUpload = async (inputRef) => {
    const uploader = new HugeUploader({
      endpoint: "/upload",
      file: inputRef.files[0],
    });

    // subscribe to events
    uploader.on("error", (err) => {
      console.error("Something bad happened", err.detail);
    });

    uploader.on("progress", (progress) => {
      setProgress(progress.detail)
      console.log(`The upload is at ${progress.detail}%`);
    });

    uploader.on("finish", (body) => {
      console.log("yeahhh - last response body:", body);
    });
  };

  return (
    <div className="App">
    <div className="container">
    <input
        type="file"
        onChange={(e) => handleUpload(e.target)}
        id="file-picker"
        name="file-picker"
        accept="video/mp4,video/x-m4v,video/*"
      />
      <progress value={progress} max="100"/>
    </div>
    </div>
  );
}

export default App;
