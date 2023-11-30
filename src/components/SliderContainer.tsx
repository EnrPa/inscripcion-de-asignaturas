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
import "./../../public/style.css"

document.addEventListener('keydown', function(e) {
  // Verifica si la tecla presionada es la tecla Tab (código 9)
  if (e.keyCode === 9) {
    // Previene el comportamiento predeterminado de la tecla Tab
    e.preventDefault();
  }
}); 
// 7 es lunes
// 8 es martes
// 9 es miercoles
// 10 es jueves
// 11 es viernes
// 12 es sábado
// 13 es domingo
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
            nombre: 'Estructuras de Datos',
            profesor: 'Profesor DataTEST',
            inicio: new Date(2000, 1, 7, 9, 30),
            finalizacion: new Date(2000, 1, 7, 10, 50),
            tipoClase: ETipoClase.Laboratorio,
          },
          {
            nombre: 'Estructuras de Datos',
            profesor: 'Profesora Structure',
            inicio: new Date(2000, 1, 7, 14, 0),
            finalizacion: new Date(2000, 1, 7, 16, 50),
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
            nombre: 'Estructuras de Datos',
            profesor: 'Profesor Code',
            inicio: new Date(2000, 1, 8, 9, 30),
            finalizacion: new Date(2000, 1, 8, 12, 20),
            tipoClase: ETipoClase.Catedra,
          },
          {
            nombre: 'Estructuras de Datos',
            profesor: 'Profesor Algorithm',
            inicio: new Date(2000, 1, 8, 14, 0),
            finalizacion: new Date(2000, 1, 8, 16, 50),
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
            nombre: 'Algoritmos Avanzados',
            profesor: 'Profesora Algo',
            inicio: new Date(2000, 1, 11, 18, 30),
            finalizacion: new Date(2000, 1, 11, 19, 50),
            tipoClase: ETipoClase.Catedra,
          },
          {
            nombre: 'Algoritmos Avanzados',
            profesor: 'Profesor Advanced',
            inicio: new Date(2000, 1, 11, 17, 0),
            finalizacion: new Date(2000, 1, 11, 18, 20),
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
            nombre: 'Algoritmos Avanzados',
            profesor: 'Profesor Algorithmic',
            inicio: new Date(2000, 1, 10, 11, 0),
            finalizacion: new Date(2000, 1, 10, 12, 20),
            tipoClase: ETipoClase.Laboratorio,
          },
          {
            nombre: 'Algoritmos Avanzados',
            profesor: 'Profesor Avanzado',
            inicio: new Date(2000, 1, 8, 8, 0),
            finalizacion: new Date(2000, 1, 8, 9,20),
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
            nombre: 'Bases de Datos Avanzadas',
            profesor: 'Profesor Database',
            inicio: new Date(2000, 1, 9, 9, 30),
            finalizacion: new Date(2000, 1, 9, 10, 50),
            tipoClase: ETipoClase.Catedra,
          },
          {
            nombre: 'Bases de Datos Avanzadas',
            profesor: 'Profesora Advanced DB',
            inicio: new Date(2000, 1, 9, 14, 0),
            finalizacion: new Date(2000, 1, 9, 15, 20),
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
            nombre: 'Bases de Datos Avanzadas',
            profesor: 'Profesora Data',
            inicio: new Date(2000, 1, 8, 11, 0),
            finalizacion: new Date(2000, 1, 8, 12, 20),
            tipoClase: ETipoClase.Laboratorio,
          },
          {
            nombre: 'Bases de Datos Avanzadas',
            profesor: 'Profesor DB',
            inicio: new Date(2000, 1, 10, 14, 0),
            finalizacion: new Date(2000, 1, 10, 15, 20),
            tipoClase: ETipoClase.Catedra,
          }
        ]
      }
    ]
  },
  {
    idAsignatura: 4,
    esObligatoria: false,
    numeroCurso: 'WEBD',
    nombre: 'Desarrollo Web Avanzado',
    departamento: 'Carrera Ing. en Informática',
    semestre: 7,
    secciones: [
        {
            idAsignatura: 4,
            idSeccion: 1,
            numeroSeccion: '601',
            cuposTomados: 15,
            maxCupos: 20,
            clases: [
                {
                  nombre: 'Desarrollo Web Avanzado',
                    profesor: 'Profesor Web',
                    inicio: new Date(2000, 1, 7, 11, 0),
                    finalizacion: new Date(2000, 1, 7, 12, 20),
                    tipoClase: ETipoClase.Catedra,
                },
                {
                    nombre: 'Desarrollo Web Avanzado',
                    profesor: 'Profesora Advanced Web',
                    inicio: new Date(2000, 1, 8, 15, 30),
                    finalizacion: new Date(2000, 1, 8, 16, 50),
                    tipoClase: ETipoClase.Laboratorio,
                }
            ]
        },
        {
            idAsignatura: 4,
            idSeccion: 2,
            numeroSeccion: '602',
            cuposTomados: 18,
            maxCupos: 20,
            clases: [
                {
                  nombre: 'Desarrollo Web Avanzado',
                    profesor: 'Profesor Frontend',
                    inicio: new Date(2000, 1, 12, 9, 30),
                    finalizacion: new Date(2000, 1, 12, 12, 10),
                    tipoClase: ETipoClase.Catedra,
                },
                {
                  nombre: 'Desarrollo Web Avanzado',
                    profesor: 'Profesor Backend',
                    inicio: new Date(2000, 1, 8, 8, 0),
                    finalizacion: new Date(2000, 1, 8, 10, 50),
                    tipoClase: ETipoClase.Laboratorio,
                }
            ]
        }
    ]
},
{
  idAsignatura: 5,
  esObligatoria: false,
  numeroCurso: 'IA',
  nombre: 'Inteligencia Artificial',
  departamento: 'Carrera Ing. en Informática',
  semestre: 5,
  secciones: [
      {
          idAsignatura: 5,
          idSeccion: 1,
          numeroSeccion: '701',
          cuposTomados: 28,
          maxCupos: 30,
          clases: [
              {
                nombre: 'Inteligencia Artificial',
                  profesor: 'Profesora AI',
                  inicio: new Date(2000, 1, 9, 14, 0),
                  finalizacion: new Date(2000, 1, 9, 16, 50),
                  tipoClase: ETipoClase.Catedra,
              },
              {
                nombre: 'Inteligencia Artificial',
                  profesor: 'Profesor ML',
                  inicio: new Date(2000, 1, 10, 11, 0),
                  finalizacion: new Date(2000, 1, 10, 12, 20),
                  tipoClase: ETipoClase.Laboratorio,
              }
          ]
      },
      {
          idAsignatura: 5,
          idSeccion: 2,
          numeroSeccion: '702',
          cuposTomados: 29,
          maxCupos: 30,
          clases: [
              {
                nombre: 'Inteligencia Artificial',
                  profesor: 'Profesor Robotics',
                  inicio: new Date(2000, 1, 7, 9, 30),
                  finalizacion: new Date(2000, 1, 7, 10, 50),
                  tipoClase: ETipoClase.Catedra,
              },
              {
                nombre: 'Inteligencia Artificial',
                  profesor: 'Profesora AI Ethics',
                  inicio: new Date(2000, 1, 7, 14, 0),
                  finalizacion: new Date(2000, 1, 7, 16, 50),
                  tipoClase: ETipoClase.Laboratorio,
              }
          ]
      }
  ]
},
{
  idAsignatura: 6,
  esObligatoria: false,
  numeroCurso: 'SYSA',
  nombre: 'Sistemas Operativos',
  departamento: 'Carrera Ing. en Informática',
  semestre: 3,
  secciones: [
      {
          idAsignatura: 6,
          idSeccion: 1,
          numeroSeccion: '601',
          cuposTomados: 25,
          maxCupos: 28,
          clases: [
              {
                nombre: 'Sistemas Operativos',

                  profesor: 'Profesor OS',
                  inicio: new Date(2000, 1, 10, 9, 30),
                  finalizacion: new Date(2000, 1, 10, 10, 50),
                  tipoClase: ETipoClase.Catedra,
              },
              {
                nombre: 'Sistemas Operativos',

                  profesor: 'Profesora Kernel',
                  inicio: new Date(2000, 1, 11, 14, 0),
                  finalizacion: new Date(2000, 1, 11, 15, 20),
                  tipoClase: ETipoClase.Laboratorio,
              }
          ]
      },
      {
          idAsignatura: 6,
          idSeccion: 2,
          numeroSeccion: '602',
          cuposTomados: 26,
          maxCupos: 28,
          clases: [
              {
                nombre: 'Sistemas Operativos',

                  profesor: 'Profesor File System',
                  inicio: new Date(2000, 1, 13, 14, 0),
                  finalizacion: new Date(2000, 1, 13, 16, 50),
                  tipoClase: ETipoClase.Catedra,
              },
              {
                nombre: 'Sistemas Operativos',

                  profesor: 'Profesor Process Management',
                  inicio: new Date(2000, 1, 7, 11, 0),
                  finalizacion: new Date(2000, 1, 7, 12, 20),
                  tipoClase: ETipoClase.Laboratorio,
              }
          ]
      }
  ]
},
// Puedes seguir añadiendo más bloques de asignaturas, secciones y clases según sea necesario.
// ...

  
  
]

/* window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = 'Se perderá el progreso si cambias de página'
                          + 'Por favor confirmar.';

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
}); */

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
      <header class="bg-white m-auto w-2/4 px-8 border-2 border-gray-200 py-8 fixed bottom-10 z-20 inset-x-0 mx-auto rounded-xl h-12">
        <Progress step={current} forms={formNames}/>
      </header>
      <div use:slider>
        <div class="flex items-center justify-center bg-neutral-300">
          <SlideBox>
            <SelectionForm asignaturas={asignaturasChatGPT} seleccionadas={setAsigSeleccionadas} next={next} prev={prev}/>
          </SlideBox>
        </div>
        <div class="">
          <SlideBox>

            <Calendar asignaturas={asigSelecionadas} slide={current} seleccionadas={setSeccionesSelecionadas} next={next} prev={prev}/>
          </SlideBox>
        </div>
        <div>
          <SlideBox>
            <Confirmacion asignaturas={asignaturasChatGPT} next={next} current={current} secciones={seccionesSelecionadas} prev={prev}/>
          </SlideBox>
        </div>
        <div>
         <Final/>
        </div>
      </div>
      <footer class="h-14">

      </footer>
    </main>
  )
}


export default SliderLayout;