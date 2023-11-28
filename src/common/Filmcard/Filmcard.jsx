import "./Filmcard.css";

export function Filmcard({ title, imageUrl }) {
  return (
    <div className="filmcard-container">
      <div
        className="filmcard-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="filmcard-title">{title}</div>
    </div>
  );
}
