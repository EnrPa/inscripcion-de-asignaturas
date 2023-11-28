export default function SlideBox({children, title}: {children: any, title?:string}) {
  return (
    <div class="bg-white transition-all ease-in-out duration-500 max-h-screen p-11 min-w-3/4 shadow-lg rounded-lg flex items-center justify-center">
      {children}
    </div>
  )
}