import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

function Menu() {
  return (
    <>
      <Header />
      <Pizza />
      <Pizza />
      <Pizza />
      <Pizza />
      <Footer />
    </>
  )
}

function Header() {
  return (
    <h1>Fast React Pizza CO.</h1>
  )
}

function Pizza() {
  return (
    <div>
      <h2>Our Menu</h2>
      <img src="/pizzas/prosciutto.jpg" alt="focaccia" />
      <p>Pizza Prosciuto</p>
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
