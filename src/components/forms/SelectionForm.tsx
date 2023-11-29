import { For, createSignal, type Signal } from "solid-js";
import type { IAsignatura, ISeccion } from "../interfaces";
import { createMutable, createStore, unwrap } from "solid-js/store";
import { assign } from "solid-js/web";

export default function SelectionForm(props: any) {
  //let seleccion: IAsignatura[] = [];
  let [seleccion, setSeleccion] = createSignal<IAsignatura[]>([]);
  function toggleSelected(e: any, asignatura: IAsignatura) {

    if (!e.target.checked && seleccion().some((x) => x.idAsignatura != asignatura.idAsignatura)) {
      setSeleccion(seleccion().filter(x => x.idAsignatura != asignatura.idAsignatura))
    } else {
      setSeleccion([...seleccion(), asignatura]);
    }
  }


  props.asignaturas.forEach((asignatura: any) => {
    if (asignatura.esObligatoria) {
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
    <div >
      <table class="selection-table rounded-lg bg-white p-4 shadow ">
        <caption class="mb-4 font-bold">Asignaturas a elegir, como máximo son 8</caption>
        <thead >
          <tr>
            <th class="border p-4 whitespace-nowrap border-gray-200">Seleccionada</th>
            <th class="border p-4 whitespace-nowrap border-gray-200">Número Curso</th>
            <th class="border p-4 whitespace-nowrap border-gray-200">Nombre</th>
            <th class="border p-4 whitespace-nowrap border-gray-200">Semestre</th>
            <th class="border p-4 whitespace-nowrap border-gray-200">¿Obligatoria?</th>
            <th class="border p-4 whitespace-nowrap border-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          <For each={props.asignaturas}>{(asignatura: IAsignatura) =>
            <>
              <tr class="">
                <td class="border p-4 border-gray-200"><input class="" type="checkbox" checked={seleccion().includes(asignatura)} disabled={asignatura.esObligatoria} onInput={(e) => { toggleSelected(e, asignatura) }} /></td>
                <td class="border p-4 border-gray-200">{asignatura.numeroCurso}</td>
                <td class="border p-4 border-gray-200">{asignatura.nombre}</td>
                <td class="border p-4 border-gray-200">Semestre N°{asignatura.semestre}</td>
                <td class="border p-4 border-gray-200">{asignatura.esObligatoria ? "Sí" : "No"}</td>
                <td class="border p-4 border-gray-200"><details onToggle={() => { document.getElementById(asignatura.numeroCurso)?.classList.toggle('hidden') }}><summary>Más Información</summary></details></td>
              </tr>
              <tr  >
                <td id={asignatura.numeroCurso} colSpan={6} class="hidden overflow-hidden transition-all ease-in-out duration-300 border border-gray-200">
                  <dl>
                    <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        N° Curso
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {asignatura.numeroCurso}
                      </dd>
                    </div>
                    <div class="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">
                        Departamento
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {asignatura.departamento}
                      </dd>
                    </div>
                    <h2 class="text-sm pt-4 font-medium text-gray-500 px-4 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">Secciones</h2>
                    <div class="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <For each={asignatura.secciones}>{(seccion: ISeccion) => (
                        <>
                          <dt class="text-sm font-medium text-gray-500">{asignatura.numeroCurso + "-" + seccion.numeroSeccion}</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{seccion.maxCupos - seccion.cuposTomados} cupo(s) de {seccion.maxCupos} disponibles</dd>
                        </> 
                      )}</For>
                    </div>
                  </dl>
                </td>
              </tr>
            </>
          }</For>
        </tbody>
      </table>
      <div>
        <button onClick={() => handleContinue()} class="continue flex justify-between">Continuar <img src="next.svg" /></button>
      </div>
    </div>
  )
}