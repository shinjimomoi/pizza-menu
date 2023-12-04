import "./App.css";
import pizzaData from "./data";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
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

export default App;
