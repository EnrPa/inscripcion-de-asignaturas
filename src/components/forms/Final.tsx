import SlideBox from "./SlideBox";

export default function Final() {
  return (
    <main class="w-full h-full">
      <div class="h-12"></div>
      <div class="w-full h-full flex">
        <div class="w-max m-auto  h-max shadow-xl p-7 rounded-xl text-center">
          <h1 class="text-background text-6xl p-4">¡Ramos inscritos!</h1>
          <h2>Los ramos ya están inscritos, puede cerrar la página</h2>
          <button onClick={() => {window.location.href = "http://localhost:4321/"}} class="continue">Ir a página principal</button>

        </div>
      </div>
    </main>
  )
}