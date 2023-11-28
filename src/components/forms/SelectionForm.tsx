import { For, createSignal, type Signal } from "solid-js";
import type { IAsignatura, ISeccion } from "../interfaces";
import { createMutable, createStore, unwrap } from "solid-js/store";
import { assign } from "solid-js/web";

export default function SelectionForm(props : any) {
  //let seleccion: IAsignatura[] = [];
  let [seleccion, setSeleccion] = createSignal<IAsignatura[]>([]); 
  function toggleSelected(e: any, asignatura: IAsignatura) {

    if (!e.target.checked && seleccion().some((x) => x.idAsignatura != asignatura.idAsignatura)){
      setSeleccion(seleccion().filter(x => x.idAsignatura != asignatura.idAsignatura))
    } else{
      setSeleccion([...seleccion(), asignatura]);
    }
  }


  props.asignaturas.forEach((asignatura: any) => {
    if (asignatura.esObligatoria){
      setSeleccion([...seleccion(), asignatura]);
    }
  })
  function handleContinue() {
    console.log("[handleContinue]", 'asignaturas', seleccion())
    props.seleccionadas(seleccion());
    // Por alguna razón la función de arriba funciona SOLO a veces... ¿Qué weá?
    // TODO: Arreglar eso.
    props.next();
  }



  return (
    <div>
      <table class="selection-table">
        <caption>Asignaturas a elegir, como máximo son 8</caption>
        <thead >
          <tr>
            <th>Seleccionada</th>
            <th>Número Curso</th>
            <th>Nombre</th>
            <th>Semestre</th>
            <th>¿Obligatoria?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <For each={props.asignaturas}>{(asignatura: IAsignatura) => 
            <>
              <tr class="bg-red-200">
                <td><input type="checkbox" checked={seleccion().includes(asignatura)} disabled={asignatura.esObligatoria} onInput={(e) => {toggleSelected(e,asignatura)}}/></td>
                <td>{asignatura.numeroCurso}</td>
                <td>{asignatura.nombre}</td>
                <td>Semestre N°{asignatura.semestre}</td>
                <td>{asignatura.esObligatoria ? "Sí" : "No"}</td>
                <td><details onToggle={() => {document.getElementById(asignatura.numeroCurso)?.classList.toggle('hidden')}}><summary>Más Información</summary></details></td>
              </tr>
              <tr  >
                <td id={asignatura.numeroCurso} colSpan={6} class="hidden overflow-hidden transition-all ease-in-out duration-300">
                  <p><b>N° Curso:</b> {asignatura.numeroCurso}</p>
                  <p><b>Departamento:</b> {asignatura.departamento}</p>
                  <h2>Secciones:</h2>
                  <For each={asignatura.secciones}>{(seccion: ISeccion) => 
                    <section>
                      <h2>{asignatura.numeroCurso + "-"+ seccion.numeroSeccion}</h2>
                      <p><b>Cupos: </b>{seccion.maxCupos - seccion.cuposTomados} de {seccion.maxCupos} disponibles</p>
                    </section>
                  }</For>
                </td>
              </tr>
            </>
          }</For>
        </tbody>
      </table>
      <button onClick={() => handleContinue()}>Continuar</button>
    </div>
  )
}