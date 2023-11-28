import SlideBox from "./SlideBox";

export default function Final() {
  return (
    <main>
      <SlideBox>
        <h1>¡Ramos inscritos!</h1>
        <h2>Los ramos ya están inscritos, puede cerrar la página</h2>
        <button onClick={() => {window.location.href = "http://localhost:4321/"}}>Salir</button>
      </SlideBox>
    </main>
  )
}