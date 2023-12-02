import "./App.css";
import pizzaData from "./data";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Menu() {
  return (
    <main>
      <h2>Our Menu</h2>
      <div>
        {pizzaData.map((pizza) => <Pizza name={pizza.name} ingredients={pizza.ingredients} price={pizza.price} photoName={pizza.photoName} soldOut={pizza.soldOut}/>)}
      </div>
      <Pizza />
    </main>
  )
}

function Header() {
  return (
    <h1>Fast React Pizza CO.</h1>
  )
}

function Pizza(props) {
  return (
    <div>
      <img src={props.photoName} alt="menu" />
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <p><strong>USD ${props.price},00</strong></p>
      {props.soldOut ? <p>sold out</p> : null}
    </div>
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
