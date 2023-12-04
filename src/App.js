import "./App.css";
import pizzaData from "./data";
import tags from "./tags";

function App() {
  return (
    <div className="container">
      {/* <Header />
      <Menu />
      <Footer /> */}
      <Card />
    </div>
  );
}

function Menu() {
  let counter = 0
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((pizza) => (<Pizza key={counter++} pizzaObj={pizza}/>))}
      </ul>
    </main>
  )
}

function Header() {
  return (
    <header className="header footer">
      <h1>Fast React Pizza CO.</h1>
    </header>
  )
}

function Pizza(props) {
  console.log(props, "props")
  return (
    <li className={`pizza ${props.pizzaObj.soldOut && "sold-out"}`}>
      <img src={props.pizzaObj.photoName} alt="menu" />
      <h3>{props.pizzaObj.name}</h3>
      <p>{props.pizzaObj.ingredients}</p>
      <p><strong>USD ${props.pizzaObj.price},00</strong></p>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours;
  const openHours = hour > 10 && hour < 22;
  const isOpen = openHours ? "open" : "closed";
  return (
    <h4>We are {isOpen}</h4>
  )
}

function Card() {
  return (
    <div className="container-card">
      <img src={pizzaData[0].photoName} alt="dev"></img>
      <h1>Shinji Momoi</h1>
      <p>A skilled developer proficient in various programming languages and frameworks, adept at designing and implementing efficient, scalable, and maintainable software solutions. Possesses strong problem-solving skills, a keen eye for detail..</p>
      <ul style={ {marginTop: 8}}>
      {tags.map(tag => (
        <span style={{backgroundColor: tag.color}}>{tag.name} {tag.icon}</span>
      ))}
      </ul>
    </div>
  )
}

export default App;
