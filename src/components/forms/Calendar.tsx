import { createMutable, createStore, unwrap } from "solid-js/store";
import { ETipoClase, type IAsignatura, type IClases, type ISeccion } from "../interfaces";
import { For, createEffect, createSignal, mergeProps, on } from "solid-js";
const weekDay = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const fuckedUpWeekDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
const tiempos = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

function UIEvent(props: any) {
  let startMinute = props.clase.inicio.getMinutes() + props.clase.inicio.getHours() * 60
  startMinute = startMinute == 0 ? 1 : startMinute;
  let endMinute = props.clase.finalizacion.getMinutes() + props.clase.finalizacion.getHours() * 60
  if (fuckedUpWeekDay[props.clase.inicio.getDay()] != props.day) return

  return (
    <div class={'static rounded-lg  bg-white text-center w-auto overflow-hidden border-2 border-solid border-amber-300 shadow' + props.class}
      style={{ "grid-row-start": startMinute, "grid-row-end": endMinute }}>
      <p class="text-base font-bold text-gray-800 my-0">{props.clase.profesor}</p>
      <p class="text-s font-light text-gray-500 my-0">{props.clase.tipoClase}</p>
    </div>
  )
}


export function WeekView(props: any) {
  return (
    <div class="shadow-lg w-[60rem] h-full flex flex-row">
      <div class="h-full flex flex-col justify-evenly items-stretch">
        <header class="bg-primary1 py-2 ">
          <h1>Tiempo</h1>
        </header>
        <div class="flex flex-col  justify-between h-[800px] text-center">
          <For each={tiempos}>{(hora) =>
            <p>{hora}</p>
          }</For>
        </div>
      </div>
      <For each={weekDay}>{(day: string) =>
        <div class="h-full w-full min-w-[4rem]">
          <header class="bg-primary1 px-4 py-2 border-l border-gray-700">
            <h1 class="text-center">{day}</h1>
          </header>
          <div class="w-full bg-gray-200 border-l border-black h-[800px] grid grid-rows-[repeat(1440,_minmax(0,_1fr))] grid-flow-row">
            <For each={props.hover().clases}>{(clase: IClases) =>
              <UIEvent clase={clase} day={day} class="bg-blue-200" />
            }</For>
            <For each={props.selected()}>{(seccion: ISeccion) =>
              <For each={seccion.clases}>{(clase) =>
                <UIEvent clase={clase} day={day}  class="bg-green-200" />
              }</For>
            }</For>
          </div>
        </div>
      }</For>
    </div>
  )
}
export function FinalWeekView(props: any) {
  return (
    <div class="shadow-lg w-[700px] h-full flex flex-row">
      <For each={weekDay}>{(day: string) =>
        <div class="h-full w-full min-w-[4rem]">
          <header class="bg-primary1 px-4 py-2 border-x border-gray-700">
            <h1>{day}</h1>
          </header>
          <div class="w-full bg-gray-200 border border-black h-[800px] grid grid-rows-[repeat(1440,_minmax(0,_1fr))] grid-flow-row">
            <For each={props.asignaturas()}>{(seccion: ISeccion) =>
              <For each={seccion.clases}>{(clase: IClases) =>
                <UIEvent clase={clase} day={day} class="bg-green-200" />
              }</For>
            }</For>
          </div>
        </div>
      }</For>
    </div>
  )
}


function AsignaturasList(props: any) {
  const formatter = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit' });
  function formatTime(start: Date, end: Date) {
    return fuckedUpWeekDay[start.getDay()] + " a las " + formatter.format(start) + " hasta las " + formatter.format(end)
  }

  function getIcon(tipoClase: ETipoClase) {
    let icono = ""
    switch (tipoClase) {
      case ETipoClase.Catedra:
        icono = "/catedra.svg";
        break;
      case ETipoClase.Laboratorio:
        icono = "/lab.svg";
        break;
      case ETipoClase.Taller:
        icono = "/taller.svg";
        break
    }
    return <img src={icono} class="w-min h-min pr-4" />
  }

  return (
    <section class="min-w-[40rem]  py-2 px-7 rounded-lg  max-h-[40rem] overflow-scroll m-16 border-2 shadow">

      <For each={props.asignaturas()}>{(asignatura: IAsignatura) =>
        <div class="p-2 m-2 rounded-md">
          <h2 class="text-xl font-bold p-2">{asignatura.nombre}</h2>
          <For each={asignatura.secciones}>{seccion =>
            <section
              onMouseOver={() => { props.setHover(seccion) }}
              onMouseLeave={() => props.setHover(placeHolder)}
              class= "shadow bg-white border border-gray-200 transition-colors hover:bg-gray-50 rounded-xl px-4 py-4 flex  mb-4"
            >
              <aside class="flex w-1/12 items-center justify-center">
                <input class="w-6 h-6 mr-2 checked:bg-yellow-300" type="radio" name={asignatura.numeroCurso} disabled={false} id={asignatura.idAsignatura + "-" + seccion.idSeccion} onClick={(e) => { props.toggleSelected(seccion) }} />
              </aside>
              <div>
                <h1 class="font-bold">Sección {seccion.numeroSeccion}</h1>
                <div>
                  <details >
                    <summary>Ver clases</summary>
                    <For each={seccion.clases}>{clase =>
                      <section class="ml-5 my-4">
                        <header class="flex">
                          {getIcon(clase.tipoClase)}
                          <p class="font-bold">{clase.tipoClase.toString()}</p>

                        </header>
                        <p>{formatTime(clase.inicio, clase.finalizacion)}</p>
                        <p>{clase.profesor}</p>
                      </section>
                    }</For>
                  </details>
                </div>
              </div>
            </section>
          }</For>
          <br></br>
        </div>
      }</For>
    </section>
  )
}
const placeHolder: ISeccion = {
  idAsignatura: 0,
  idSeccion: 0,
  interfiere: false,
  conQuien: undefined,
  numeroSeccion: '001',
  cuposTomados: 0,
  maxCupos: 25,
  clases: [
  ]
}

export function Calendar(props: any) {

  const [hover, setHover] = createSignal<ISeccion>(placeHolder);
  const [selected, setSelected] = createSignal<ISeccion[]>([]);
  const [final, setFinal] = createSignal();
  let prev = -1
  createEffect(() => {
    // Mecanismo que elimina todo si es que se retrocede a la selección de
    // asignaturas, evitando problemas de actualización de contenido.
    if (props.slide() == 1 && props.slide() > prev) {
      setHover(placeHolder);
      setSelected([]);
    } else {
      prev = props.slide();
    }
  })


  const toggleSelected = (newSection: ISeccion) => {
    if (selected().some(section => section.idSeccion == newSection.idSeccion && section.idAsignatura == newSection.idAsignatura)) {
      let x = document.getElementById(newSection.idAsignatura + "-" + newSection.idSeccion)! as HTMLInputElement
      x.checked = false;
      setSelected(selected().filter(section => section.idAsignatura != newSection.idAsignatura))
      return
    }
    else if (selected().some(section => section.idAsignatura == newSection.idAsignatura)) {
      setSelected(selected().filter(section => section.idAsignatura != newSection.idAsignatura))
      setSelected([...selected(), newSection])

    }
    else {
      setSelected([...selected(), newSection])
    }
  }

  createEffect(() => {
    if (selected().some((e) => e == hover())) {
      setHover(placeHolder);
    }
  })
  createEffect(() => {
    console.warn("[Calendario]: Cambió asignaturas", props.asignaturas())
  })
  createEffect(on(selected, () => {
    setFinal(selected());
  }))

  function handleContinue() {
    props.seleccionadas(final());
    props.next();
  }

  return (
    <main>
      <div >
        <div class="flex items-center">
          <AsignaturasList asignaturas={props.asignaturas} setHover={setHover} toggleSelected={toggleSelected} />
          <WeekView hover={hover} asignaturas={props.asignaturas} selected={selected} />
        </div>
        <button onClick={() => handleContinue()} class="continue">Continuar</button>
      </div>
    </main>
  )
}