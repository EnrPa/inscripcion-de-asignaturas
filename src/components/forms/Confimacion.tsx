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
          <h1 class="font-bold text-xl">{asignatura.numeroCurso}</h1>
          <h1 class="">{asignatura.nombre}</h1>
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
        <div class="block bg-white  text-black w-full">
          <For each={props.secciones()}>{(seccion:ISeccion) => 
            <section class="m-4 border border-gray-300 shadow rounded-xl p-3 w-1/3">
              {getAsignatura(seccion)}
              <h1>{seccion.numeroSeccion}</h1>
              <button onClick={() => handleConfirmar(seccion)}
              disabled={disabled()}
              class="px-4 py-2 rounded-xl mt-4 bg-primary1 border-yellow-500 border-2 font-bold"
                style={{
                  'background-color' : confirmados().includes(seccion) ? "white" : "",
                }}
              >{confirmados().includes(seccion) ? "Confirmado" : "Confirmar"}</button>
            </section>
          }</For>
        </div>
      </div>
      <button onClick={() => {handleContinue()}} class="continue">Continuar</button>
    </main>
  )
}