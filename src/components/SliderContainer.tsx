import { ETipoClase, type IAsignatura, type IFormProps, type ISeccion } from "./interfaces";
import Progress from "./Progress";
import { createEffect, createSignal, on } from "solid-js";
import SelectionForm from "./forms/SelectionForm";
import {Calendar } from "./forms/Calendar";
import {} from "solid-slider/slider.css";
import { createSlider } from "solid-slider";
import SlideBox from "./forms/SlideBox";
import Confirmacion from "./forms/Confimacion";
import Final from "./forms/Final";


const asignaturasChatGPT = [
  {
    idAsignatura: 1,
    esObligatoria: true,
    numeroCurso: 'MNSR',
    nombre: 'Estructuras de Datos',
    departamento: 'Carrera Ing. en Informática',
    semestre: 4,
    secciones: [
      {
        idAsignatura: 1,
        idSeccion: 1,
        numeroSeccion: '301',
        cuposTomados: 20,
        maxCupos: 30,
        clases: [
          {
            profesor: 'Profesor Data',
            inicio: new Date(2023, 11, 20, 10, 0),
            finalizacion: new Date(2023, 11, 20, 12, 0),
            tipoClase: ETipoClase.Laboratorio,
          },
          {
            profesor: 'Profesora Structure',
            inicio: new Date(2023, 11, 22, 14, 0),
            finalizacion: new Date(2023, 11, 22, 16, 0),
            tipoClase: ETipoClase.Catedra,
          }
        ]
      },
      {
        idAsignatura: 1,
        idSeccion: 2,
        numeroSeccion: '302',
        cuposTomados: 25,
        maxCupos: 30,
        clases: [
          {
            profesor: 'Profesor Code',
            inicio: new Date(2023, 11, 21, 9, 0),
            finalizacion: new Date(2023, 11, 21, 11, 0),
            tipoClase: ETipoClase.Catedra,
          },
          {
            profesor: 'Profesor Algorithm',
            inicio: new Date(2023, 11, 23, 13, 0),
            finalizacion: new Date(2023, 11, 23, 15, 0),
            tipoClase: ETipoClase.Laboratorio,
          }
        ]
      }
    ]
  },
  {
    idAsignatura: 2,
    esObligatoria: true,
    numeroCurso: 'ALGO',
    nombre: 'Algoritmos Avanzados',
    departamento: 'Carrera Ing. en Informática',
    semestre: 8,
    secciones: [
      {
        idAsignatura: 2,
        idSeccion: 1,
        numeroSeccion: '401',
        cuposTomados: 18,
        maxCupos: 20,
        clases: [
          {
            profesor: 'Profesora Algo',
            inicio: new Date(2023, 11, 18, 13, 0),
            finalizacion: new Date(2023, 11, 18, 15, 0),
            tipoClase: ETipoClase.Catedra,
          },
          {
            profesor: 'Profesor Advanced',
            inicio: new Date(2023, 11, 20, 15, 30),
            finalizacion: new Date(2023, 11, 20, 17, 30),
            tipoClase: ETipoClase.Laboratorio,
          }
        ]
      },
      {
        idAsignatura: 2,
        idSeccion: 2,
        numeroSeccion: '402',
        cuposTomados: 19,
        maxCupos: 20,
        clases: [
          {
            profesor: 'Profesor Algorithmic',
            inicio: new Date(2023, 11, 19, 10, 0),
            finalizacion: new Date(2023, 11, 19, 12, 0),
            tipoClase: ETipoClase.Laboratorio,
          },
          {
            profesor: 'Profesor Avanzado',
            inicio: new Date(2023, 11, 21, 14, 0),
            finalizacion: new Date(2023, 11, 21, 16, 0),
            tipoClase: ETipoClase.Laboratorio,
          }
        ]
      }
    ]
  },
  {
    idAsignatura: 3,
    esObligatoria: false,
    numeroCurso: 'BD',
    nombre: 'Bases de Datos Avanzadas',
    departamento: 'Carrera Ing. en Informática',
    semestre: 6,
    secciones: [
      {
        idAsignatura: 3,
        idSeccion: 1,
        numeroSeccion: '501',
        cuposTomados: 22,
        maxCupos: 25,
        clases: [
          {
            profesor: 'Profesor Database',
            inicio: new Date(2023, 11, 15, 9, 0),
            finalizacion: new Date(2023, 11, 15, 11, 0),
            tipoClase: ETipoClase.Catedra,
          },
          {
            profesor: 'Profesora Advanced DB',
            inicio: new Date(2023, 11, 17, 13, 0),
            finalizacion: new Date(2023, 11, 17, 15, 0),
            tipoClase: ETipoClase.Laboratorio,
          }
        ]
      },
      {
        idAsignatura: 3,
        idSeccion: 2,
        numeroSeccion: '502',
        cuposTomados: 23,
        maxCupos: 25,
        clases: [
          {
            profesor: 'Profesora Data',
            inicio: new Date(2023, 11, 16, 10, 0),
            finalizacion: new Date(2023, 11, 16, 12, 0),
            tipoClase: ETipoClase.Laboratorio,
          },
          {
            profesor: 'Profesor DB',
            inicio: new Date(2023, 11, 18, 14, 0),
            finalizacion: new Date(2023, 11, 18, 16, 0),
            tipoClase: ETipoClase.Catedra,
          }
        ]
      }
    ]
  },
  
  
]

const [asigSelecionadas, setAsigSeleccionadas] = createSignal<IAsignatura[]>([]);
const [seccionesSelecionadas, setSeccionesSelecionadas] = createSignal([]);
const formNames = ['Selección', 'Calendario', 'Confirmación', 'Finalización']

function SliderLayout() {
  const [slider, { current, next, prev, moveTo }] = createSlider({loop: false, drag:false, defaultAnimation: {duration: 2000}, renderMode: 'performance'});
  createEffect(() =>{
    switch(current()){
      case 0:
        console.log('Slide N°', current())
        setAsigSeleccionadas([]);
        setSeccionesSelecionadas([]);
        break;
      case 1:
        console.log('Slide N°', current())
        //setSeccionesSelecionadas([]);
        break;
      case 2:
    }
  })
  createEffect(() => {
    console.warn("[AsigSelecionadas]", asigSelecionadas())
  })
  createEffect(on(seccionesSelecionadas,() =>{
    console.warn("[seccionesSelecionadas]", seccionesSelecionadas() )
  }))

  return (
    <main>
      <div class="w-full h-12"></div>
      <header class="bg-white m-auto w-2/4 px-8 border-2 border-gray-200 py-8 fixed bottom-10 z-20 inset-x-0 mx-auto rounded-xl h-12">
        <Progress step={current} forms={formNames}/>
      </header>
      <div use:slider>
        <div class="flex items-center justify-center bg-neutral-300">
          <SlideBox>
            <SelectionForm asignaturas={asignaturasChatGPT} seleccionadas={setAsigSeleccionadas} next={next}/>
          </SlideBox>
        </div>
        <div>
         <Calendar asignaturas={asigSelecionadas} slide={current} seleccionadas={setSeccionesSelecionadas} next={next}/>
        </div>
        <div>
         <Confirmacion asignaturas={asignaturasChatGPT} next={next} current={current} secciones={seccionesSelecionadas}/>
        </div>
        <div>
         <Final/>
        </div>
      </div>
      <div class="bg-white">
      <button onClick={() => {prev()}}>IZQUIERDA</button>
      <p> - {current().toString()} - </p>
      <button onClick={() => {next()}}>DERECHA</button>

      </div>
    </main>
  )
}


export default SliderLayout;