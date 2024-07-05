import "../styles/Scrubber.css";

export default function Scrubber({ duration, currentTime, onScrub }) {
  const handleScrubberChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
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
