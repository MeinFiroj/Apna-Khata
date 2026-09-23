import { BeatLoader } from 'react-spinners'

const FullPageLoader = ({message}) => {
  return (
    <div className={`fixed h-screen w-full flex flex-col items-center justify-center bg-black/30 z-40`}>
        <BeatLoader color='var(--clr-primary)' />
        {message && <span className='text-(--clr-text-light) px-3 py-2 bg-(--clr-primary)'>{message}</span>}
    </div>
  )
}

export default FullPageLoader