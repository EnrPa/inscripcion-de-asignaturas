export interface IFormProps {
  step: number,
  title: string,
  content: any
}

export interface IAsignatura {
  idAsignatura: number,
  numeroCurso: string,
  esObligatoria: boolean,
  nombre: string,
  semestre: number,
  departamento: string,
  secciones: ISeccion[],
}

export enum ETipoClase {
  Laboratorio = "Laboratorio",
  Taller = "Taller",
  Catedra = "Cátedra",
}

export interface ISeccion {
  idAsignatura: number,
  idSeccion: number,
  interfiere: boolean,
  conQuien?: ISeccion,
  numeroSeccion: string,
  cuposTomados: number,
  maxCupos: number,
  clases: IClases[],
}

export interface IClases {
  nombre: string,
  profesor: string,
  inicio: Date,
  finalizacion: Date,
  tipoClase: ETipoClase;
}

export interface IAsignaturas {
  semestre: number,
  asignaturas: IAsignatura[],
}