import { For, createEffect, createSignal, on } from "solid-js";
import type { IAsignatura, ISeccion } from "../interfaces";
import { FinalWeekView, WeekView } from "./Calendar";




export default function Confirmacion(props: any){
  const [confirmados, setConfirmados] = createSignal<ISeccion[]>  ([]); 
  const [disabled, setDisabled] = createSignal(false);

  createEffect(() => {
    if (props.current() == 2){
      setConfirmados([]);
      setDisabled(false);
    }
  })


  function getAsignatura(seccion: ISeccion) {
    console.warn(seccion)
      let asignatura: IAsignatura = props.asignaturas.filter((asignatura: IAsignatura) => {
        return seccion.idAsignatura == asignatura.idAsignatura;
      })[0]
      console.log("asignatura", asignatura)
      return (
        <div>
          <h2>{asignatura.numeroCurso}</h2>
          <h1>{asignatura.nombre}</h1>
        </div>
      )
  }
  function handleConfirmar(nuevaSeccion: ISeccion){
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    },2000)

    if (confirmados().includes(nuevaSeccion)) {
      setConfirmados(confirmados().filter((seccion) => seccion.idAsignatura != nuevaSeccion.idAsignatura))
      console.warn(confirmados())
    }
    else {
      console.log("No esá")
      setConfirmados([...confirmados(), nuevaSeccion])
    }
  }

  function handleContinue() { 
    props.next();
  } 


  return (
    <main>
      <div class="flex">
        <div>
          <FinalWeekView asignaturas={props.secciones} />
        </div>
        <div class="block bg-white text-black w-full">
          <For each={props.secciones()}>{(seccion:ISeccion) => 
            <section>
              {getAsignatura(seccion)}
              <h1>{seccion.numeroSeccion}</h1>
              <button onClick={() => handleConfirmar(seccion)}
              disabled={disabled()}
              class="disabled:border-4 disabled:border-red-400"
                style={{
                  'background-color' : confirmados().includes(seccion) ? "blue" : "green",
                }}
              >Confirmar</button>
            </section>
          }</For>
        </div>
      </div>
      <button onClick={() => {handleContinue()}}>Continuar</button>
    </main>
  )
}