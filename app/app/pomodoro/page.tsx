import Timer from './components/Timer';

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex pt-10 space-x-10">
                <h1 className="hover:text-cyan-300 cursor-pointer" >Pomodoro</h1>
                <h1 className="hover:text-cyan-300 cursor-pointer" >Pausa curta</h1>
                <h1 className="hover:text-cyan-300 cursor-pointer" >Pausa Longa</h1>
            </div>
            
            {/*Timer do relogio*/}
            {/* <div className="rounded-full border border-white w-60 h-60 flex items-center justify-center"> */}
            <Timer />
            {/* </div> */}
        </div>
    );
}
