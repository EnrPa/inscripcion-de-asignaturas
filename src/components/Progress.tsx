import { For, createEffect } from "solid-js";
import type { IFormProps } from "./interfaces";



export default function Progress({step, forms}: {step: Function, forms: string[]}) {
  const max = forms.length - 1;
  const stepPercent = () => step() * 100 / max
  function StepBubble({value}: {value:number}) {
    const blue_500 = "rgb(59 130 246 / var(--tw-bg-opacity))";
    const green_600 = "rgb(22 163 74 / var(--tw-bg-opacity))";
    return (
      <div 
        class="transition-color ease-in-out duration-700 rounded-full w-8 h-8 flex items-center justify-center"
        style={{"background-color": step() < value ? blue_500 : green_600 }}
      ><p class="w-min h-min">{value}</p>
      </div>
    )
  }

  return (
    <div class="h-12 inline">
      <div class="h-full m-auto w-full">
        <div class="w-full h-1.5 bg-gray-200"></div>
        <div class="transition-[width] ease-in-out duration-700 relative h-1.5 top-[-0.375rem] w-0 bg-green-600" style={{width: stepPercent() + "%"}}></div>
      </div>
      <div class="w-full h-12 relative top-[-1rem] flex justify-between">
        <For each={forms} >{(form: string, i: any) => 
          <StepBubble value={i}/>
        }</For>
      </div>
      <div class="w-full h-12 relative top-[-2.5rem] flex justify-between">
        <For each={forms} >{(form: string) => 
          <p>{form}</p>
        }</For>
      </div>
    </div>
  )
}