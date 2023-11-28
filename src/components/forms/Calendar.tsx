import { createMutable, createStore, unwrap } from "solid-js/store";
import { ETipoClase, type IAsignatura, type IClases, type ISeccion } from "../interfaces";
import { For, createEffect, createSignal, mergeProps, on } from "solid-js";
const weekDay = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const fuckedUpWeekDay = ["Domingo","Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];


function UIEvent(props: any){
  let startMinute = props.clase.inicio.getMinutes() + props.clase.inicio.getHours() * 60 
  startMinute = startMinute == 0 ? 1 : startMinute;
  let endMinute = props.clase.finalizacion.getMinutes() + props.clase.finalizacion.getHours() * 60 
  if (fuckedUpWeekDay[props.clase.inicio.getDay()] != props.day ) return

  return (
    <div class={'static rounded-sm w-full bg-white overflow-hidden ' + props.class}
    style={{"grid-row-start": startMinute, "grid-row-end": endMinute}}>
      <p>{props.clase.profesor}</p>
      <p>{props.clase.tipoClase}</p>
    </div>
  )
}


export function WeekView(props: any){
  return (
    <div class="shadow-lg w-[700px] h-full flex flex-row">
      <For each={weekDay}>{(day: string) => 
        <div class="h-full w-full min-w-[4rem]">
          <header class="bg-primary1 px-4 py-2 border-x border-gray-700">
            <h1>{day}</h1>
          </header>
          <div class="w-full bg-gray-200 border border-black h-[800px] grid grid-rows-[repeat(1440,_minmax(0,_1fr))] grid-flow-row">
            <For each={props.hover().clases}>{(clase: IClases)=>
              <UIEvent clase={clase} day={day} class="bg-blue-200" />
            }</For>
            <For each={props.selected()}>{(seccion: ISeccion)=>
              <For each={seccion.clases}>{(clase)=>
                <UIEvent clase={clase} day={day} class="bg-green-200" />
              }</For>
            }</For>
          </div>
        </div>
      }</For>
    </div>
  )
}
export function FinalWeekView(props: any){
  createEffect(() => {
    console.warn("FUNCIONA O NO LA WEA DE", props.asignaturas())
  })
  return (
    <div class="shadow-lg w-[700px] h-full flex flex-row">
      <For each={weekDay}>{(day: string) => 
        <div class="h-full w-full min-w-[4rem]">
          <header class="bg-primary1 px-4 py-2 border-x border-gray-700">
            <h1>{day}</h1>
          </header>
          <div class="w-full bg-gray-200 border border-black h-[800px] grid grid-rows-[repeat(1440,_minmax(0,_1fr))] grid-flow-row">
          <For each={props.asignaturas()}>{(seccion: ISeccion)=>
                <For each={seccion.clases}>{(clase: IClases)=>
                  <UIEvent clase={clase} day={day} class="bg-green-200" />
                }</For>
              }</For>
          </div>
        </div>
      }</For>
    </div>
  )
}


function AsignaturasList(props: any){
  const formatter = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit'});
  function formatTime(start: Date, end: Date){
    return fuckedUpWeekDay[start.getDay()]+ " a las " + formatter.format(start) + " hasta las " +formatter.format(end)
  }


  return (
    <section class="w-2/4 max-h-[40rem] overflow-scroll bg-slate-50">

      <For each={props.asignaturas()}>{(asignatura: IAsignatura) => 
        <>
          <b>{asignatura.nombre}</b>
          <For each={asignatura.secciones}>{seccion => 
            <section 
              onMouseOver={() => {props.setHover(seccion)} } 
              onMouseLeave={() => props.setHover(placeHolder)} 
              class="bg-slate-200 transition-colors hover:bg-slate-500 flex flex-row"
            >
              <aside class="flex w-1/12  items-center justify-center">
                <input type="radio" name={asignatura.numeroCurso} disabled={false} id={asignatura.idAsignatura + "-" + seccion.idSeccion} onClick={(e) => {props.toggleSelected(seccion)}}/>
              </aside>
              <div>
                <h1>{seccion.idSeccion}. {asignatura.nombre}-{seccion.numeroSeccion}</h1>
                <div>
                  <For each={seccion.clases}>{clase => 
                    <section>
                      <p>{formatTime(clase.inicio, clase.finalizacion)}</p>
                      <p>{clase.profesor}</p>
                      <p>{clase.tipoClase.toString()}</p>
                    </section>
                  }</For>
                </div>
              </div>
            </section>
          }</For>
          <br></br>
        </>
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

export function Calendar(props: any){
  
  const [hover, setHover] = createSignal<ISeccion>(placeHolder);
  const [selected, setSelected] = createSignal<ISeccion[]>([]);
  const [final, setFinal] = createSignal();
  let prev = -1
  createEffect(() => {
    // Mecanismo que elimina todo si es que se retrocede a la selección de
    // asignaturas, evitando problemas de actualización de contenido.
    if(props.slide() == 1 && props.slide() > prev){
      setHover(placeHolder);
      setSelected([]);
    } else {
      prev = props.slide();
    }
  })


  const toggleSelected = (newSection: ISeccion) => {
    if (selected().some(section => section.idSeccion == newSection.idSeccion && section.idAsignatura == newSection.idAsignatura)){
      let x =document.getElementById(newSection.idAsignatura + "-" + newSection.idSeccion)! as HTMLInputElement
      x.checked = false;
      setSelected(selected().filter(section => section.idAsignatura != newSection.idAsignatura))
      console.error("Buen intento sacowea!")
      return
    }
    else if (selected().some(section => section.idAsignatura == newSection.idAsignatura)){    
      console.error("Reemplazado", newSection)
      setSelected(selected().filter(section => section.idAsignatura != newSection.idAsignatura))
      setSelected([...selected(), newSection])
      
    }
    else {
      console.error("Agregado!")
      setSelected([...selected(), newSection])
    }
  }

  createEffect(() => {
    if (selected().some((e) => e == hover())) {
      setHover(placeHolder);
    }
  })
  createEffect(() =>{
    console.warn("[Calendario]: Cambió asignaturas", props.asignaturas())
  })
  createEffect(on(selected, () => {
    setFinal(selected());
  }))

  function handleContinue(){
    props.seleccionadas(final());

/*     let idSelectedList = selected().map(selected => selected.idSeccion)
    console.log(idSelectedList)
    let final = props.asignaturas().map((asignatura: IAsignatura) => {
      let seccion = asignatura.secciones.filter(seccion => idSelectedList.includes(seccion.idSeccion))
      asignatura.secciones = seccion;
      return asignatura
    })
    console.warn("[FINAL]", final)
    props.seleccionadas(final); */
    props.next();
  }

  return (
    <main>
      <div >
        <div class="flex items-center">
          <AsignaturasList asignaturas={props.asignaturas} setHover={setHover} toggleSelected={toggleSelected}/>
          <WeekView hover={hover} asignaturas={props.asignaturas} selected={selected}/>
        </div>
        <button onClick={() => handleContinue()}>Continuar</button>
      </div>
    </main>
  )
}