import { For, createEffect, createSignal, on } from "solid-js";
import type { IAsignatura, ISeccion } from "../interfaces";
import { FinalWeekView, WeekView } from "./Calendar";




export default function Confirmacion(props: any){
  const [confirmados, setConfirmados] = createSignal<ISeccion[]>  ([]); 
  const [isDisabledContinue, setIsDisabledContinue] = createSignal(true);

  createEffect(() => {
    if (props.current() == 2){
      setConfirmados([]);
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
  createEffect(on(confirmados, () => {
    if (confirmados().length == props.secciones().length){
      console.log("oo")
      setIsDisabledContinue(false)
    } else {
      setIsDisabledContinue(true)
    }
  }))


  return (
    <main>
      <div class="flex">
        <div>
          <FinalWeekView asignaturas={props.secciones} />
        </div>
        <div class="block bg-white text-black w-full min-w-[20rem]">
          <For each={props.secciones()}>{(seccion:ISeccion) => 
            <section class="m-4 border w-full border-gray-300 shadow rounded-xl p-3">
              {getAsignatura(seccion)}
              <h1>{seccion.numeroSeccion}</h1>
              <button onClick={() => handleConfirmar(seccion)}
              class="px-4 py-2  rounded-xl mt-4 bg-primary1  border-yellow-500 border-2 font-bold"
                style={{
                  'background-color' : confirmados().includes(seccion) ? "white" : "",
                }}
              >{confirmados().includes(seccion) ? "Confirmado" : "Confirmar"}</button>
            </section>
          }</For>
          <div class="flex">
            <button onClick={() => props.prev()} class="back flex"> <img src="back.svg" />Volver</button>
            <button onClick={() => {handleContinue()}} class="continue flex justify-between" disabled={isDisabledContinue()}>Continuar <img src="next.svg" /></button>
          </div>
        </div>
      </div>
    </main>
  )
}