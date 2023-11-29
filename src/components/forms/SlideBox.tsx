export default function SlideBox({children, title}: {children: any, title?:string}) {
  return (
    <div class="bg-white transition-all ease-in-out duration-500  p-11 w-screen shadow-lg rounded-lg flex items-center justify-center">
      {children}
    </div>
  )
}