import { useRef, useState } from "react";
import Scrubber from "../components/Scrubber";
import Webcam from "react-webcam";
import "../styles/Divestream.css";
import "react-scrubber/lib/scrubber.css";

export default function Divestream() {
  const [show_video, setShowVideo] = useState(false);
  const video_element = useRef(null);

  const video_constraints = {
    width: 320,
    height: 320,
    facingMode: "user",
  };

  const startCam = () => {
    setShowVideo(true);
  };

  const stopCam = () => {
    let stream = video_element.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setShowVideo(false);
  };

  return (
    <div className="divestream-wrapper">
      <div className="divestream">
        <Webcam
          className="camera"
          mirrored={true}
          audio={false}
          ref={video_element}
          videoConstraints={video_constraints}
          forceScreenshotSourceSize="true"
        />
        <Scrubber duration={1000} currentTime={500} onScrub={() => {}} />
      </div>
    </div>
  );
}
// use webcam for recording, but use video frames for playback
