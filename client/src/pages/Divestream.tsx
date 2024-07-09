import { useRef, useState, useEffect, useCallback } from "react";
import Scrubber from "../components/Scrubber.tsx";
import Webcam from "react-webcam";
import ClipStitcher from "../mt/ClipStitcher.ts";
import "../styles/Divestream.css";

const FIVE_SECONDS = 5000;

export default function Divestream() {
  const [delay_seconds, setDelaySeconds] = useState(0);
  //const [capturing, setCapturing] = useState(true); // will be used in case there is a failed connection to backend?
  const [clip_buffer, setClipBuffer] = useState([]);
  const video_element = useRef<Webcam>(null);
  const media_recorder = useRef<MediaRecorder | null>(null);
  const stream_video_path = "divestream-video-path.webm";

  const stitcher = new ClipStitcher(60, stream_video_path);

  const handleDataAvailable = useCallback(
    ({ data }: { data: any }) => {
      if (data.size > 0) {
        setClipBuffer((prev) => prev.concat(data));
      }
    },
    [setClipBuffer]
  );

  useEffect(() => {
    if (video_element.current && video_element.current.stream) {
      media_recorder.current = new MediaRecorder(video_element.current.stream, {
        mimeType: "video/webm",
      });

      media_recorder.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );

      media_recorder.current.start();
      const interval = setInterval(() => {
        sendClip();
      }, FIVE_SECONDS);

      return () => {
        clearInterval(interval);
        if (
          media_recorder.current &&
          media_recorder.current.state === "recording"
        ) {
          media_recorder.current.stop();
        }
      };
    }
  }, [video_element]);

  async function sendClip() {
    await stitcher.stitch(clip_buffer, 5);
    setClipBuffer([]);
  }

  const video_constraints = {
    width: 1024,
    height: 764,
    facingMode: "user",
  };

  return (
    <div className="divestream-wrapper">
      <div className="divestream">
        {delay_seconds === 0 ? (
          <Webcam
            className="camera"
            mirrored={true}
            audio={false}
            ref={video_element}
            videoConstraints={video_constraints}
          />
        ) : (
          <video
            className="delayed-stream"
            src={stream_video_path}
            autoPlay
          ></video>
        )}
      </div>
    </div>
  );
}
