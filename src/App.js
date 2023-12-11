import "./App.css";
import pizzaData from "./data";
import skills from "./skills";
import downloadCSV from "./CsvDownload";
import generatePDF from "./Pdf";

import { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Update body styles based on dark mode state
  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = darkMode ? "#333" : "#ffffff";
    body.style.color = darkMode ? "#ffffff" : "#333333";
    // Add more body styles as needed

    return () => {
      // Clean up styles when the component unmounts
      body.style.backgroundColor = "";
      body.style.color = "";
    };
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

function App() {
  return (
    <DarkModeProvider>
      <div className="container">
        <Header />
        <Menu />
        <Footer />
        <Card />
      </div>
    </DarkModeProvider>
  );
}

const filteredData = pizzaData.map(({ name, price, ingredients }) => ({
  name,
  price,
  ingredients,
}));

const PdfDownload = () => {
  const data = filteredData;

  const handleDownload = () => {
    generatePDF(data);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

function DownloadCsv() {
  const data = filteredData;

  const handleDownload = () => {
    downloadCSV(data, "pizza-menu.csv");
  };

  return (
    <div>
      <button onClick={handleDownload}>Menu download</button>
    </div>
  );
}

function colorNameToRgb(colorName) {
  // Create a temporary element
  const tempElement = document.createElement("div");
  tempElement.style.color = colorName;

  // Append the element to the document body (required for getComputedStyle to work)
  document.body.appendChild(tempElement);

  // Get the computed RGB color
  const computedColor = window.getComputedStyle(tempElement).color;

  // Remove the temporary element
  document.body.removeChild(tempElement);

  // Parse the RGB values from the computed color
  const match = computedColor.match(/\d+/g);
  if (!match || match.length < 3) {
    throw new Error("Failed to parse RGB values from color name");
  }

  console.log(match, "match");

  // Return an array of RGB values
  return match.map(Number);
}

function rgbArrayToString(rgbArray) {
  // Ensure the array has exactly three values
  if (rgbArray.length !== 3) {
    throw new Error("Invalid RGB array");
  }

  // Map each value to a valid RGB component (0 to 255)
  const rgbComponents = rgbArray.map((value) =>
    Math.max(0, Math.min(255, parseInt(value)))
  );

  // Return the formatted RGB string
  return `rgb(${rgbComponents.join(", ")})`;
}

function getTextColorForBackground(backgroundColor) {
  // Convert the background color to an RGB array
  const rgb = backgroundColor.match(/\d+/g).map(Number);

  // Calculate the luminance using the relative luminance formula
  const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];

  // Choose white or black as the text color based on luminance
  return luminance > 128 ? "black" : "white";
}

function Skill({ color, level, skill }) {
  let rgb = colorNameToRgb(color);
  let rgbString = rgbArrayToString(rgb);
  const textColor = getTextColorForBackground(rgbString);

  return (
    <div
      className="skill"
      style={{
        backgroundColor: color,
        padding: 4,
        borderRadius: "4px",
        color: textColor,
      }}
    >
      <span>{skill}</span>{" "}
      <span>
        {level === "advanced" && "💪🏻"}
        {level === "amateur" && "🐣"}
        {level === "intermediate" && "👦"}
      </span>
    </div>
  );
}

function Card() {
  const inlineStyle = {
    backgroundImage: 'url("/pizzas/prof_pic3.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "400px",
  };
  return (
    <div className="container-card">
      <div style={inlineStyle}></div>
      <h1>Shinji Momoi</h1>
      <p>
        A skilled developer proficient in various programming languages and
        frameworks, adept at designing and implementing efficient, scalable, and
        maintainable software solutions. Possesses strong problem-solving
        skills, a keen eye for detail..
      </p>
      <ul
        style={{
          marginTop: 8,
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        {skills.map((skill) => (
          <Skill
            id={skill.name}
            color={skill.color}
            skill={skill.skill}
            level={skill.level}
          />
        ))}
      </ul>
    </div>
  );
}

function Menu() {
  let counter = 0;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza key={counter++} pizzaObj={pizza} />
        ))}
      </ul>
      <DownloadCsv />
      <PdfDownload />
    </main>
  );
}

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      {/* Other header content */}
      <h1>Header</h1>
    </header>
  );
};

function Pizza(props) {
  console.log(props, "props");
  return (
    <li className={`pizza ${props.pizzaObj.soldOut && "sold-out"}`}>
      <img src={props.pizzaObj.photoName} alt="menu" />
      <h3>{props.pizzaObj.name}</h3>
      <p>{props.pizzaObj.ingredients}</p>
      <p>
        <strong>USD ${props.pizzaObj.price},00</strong>
      </p>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours;
  const openHours = hour > 10 && hour < 22;
  const isOpen = openHours ? "open" : "closed";
  return <h4>We are {isOpen}</h4>;
}

export default App;
