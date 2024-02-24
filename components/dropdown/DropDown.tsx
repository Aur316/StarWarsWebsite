import React from "react";
interface DropDownProps {
  title: string;
  element: string[];
  onHover: (margin: number | false) => void;
}
const DropDown: React.FC<DropDownProps> = ({ title, element, onHover }) => {
  const handleMouseEnter = () => {
    if (onHover) {
      const itemHeight = 16;
      const baseMargin = 45;
      const calculatedMargin = baseMargin + element.length * itemHeight;
      onHover(calculatedMargin);
    }
  };

  const handleMouseLeave = () => {
    if (onHover) {
      onHover(false);
    }
  };

  return (
    <div
      style={{ maxHeight: "30%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="unique-paste-button">
        <button className="unique-button">{title} &nbsp; ▼</button>
        <div className="unique-dropdown-content">
          <a className="unique-link-top">
            {element.length > 0 ? (
              <ul>
                {element.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            ) : (
              <p>No {title} available.</p>
            )}
          </a>
        </div>
      </div>
    </div>
  );
};
export default DropDown;
