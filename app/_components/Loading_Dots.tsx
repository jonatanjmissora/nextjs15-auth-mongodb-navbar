
export default function Loading_Dots({className}: {className?: string}) {
  return (
    <div className='h-[1.5rem] flex justify-center items-center gap-1'>
        <div className={`rounded-full bg-white size-2 animate-bounce [animation-delay:-0.3s] ${className}`}></div>
        <div className={`rounded-full bg-white size-2 animate-bounce [animation-delay:-0.15s] ${className}`}></div>
        <div className={`rounded-full bg-white size-2 animate-bounce ${className}`}></div>
    </div>
  )
}
