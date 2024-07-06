import "../styles/Scrubber.css";

export default function Scrubber({
  duration,
  currentTime,
  onScrub,
}: {
  duration: number;
  currentTime: number;
  onScrub: (num: number) => void;
}) {
  const handleScrubberChange = (event: any) => {
    const newTime: number = (event.target.value / 100) * duration;
    onScrub(newTime);
  };

  return (
    <div className="scrubber-container">
      <input
        className="scrubber"
        type="range"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        step="0.1"
        onChange={handleScrubberChange}
      />
    </div>
  );
}
