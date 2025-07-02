'use client';
import { useState } from 'react';
import Timer from './components/Timer';

export default function Page() {
    const [mode, setMode] = useState < 'pomodoro'| 'short'|'long'>('pomodoro');

    const getSetting = () =>{
        switch(mode){
            case 'short':
                return {duration: 0.2 * 60, color: 'text-blue-400'}; //10
            case 'long':
                return {duration: 0.3 * 60, color: 'text-blue-400'}; //15
            default:
                return {duration: 0.5 * 60, color: 'text-white'}; //25
        }
    };
    const {duration, color} = getSetting();
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex pt-10 space-x-10">
                <h1 onClick={() => setMode('pomodoro')} className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === 'pomodoro' ? 'text-cyan-300': ''}`}>Pomodoro</h1>
                <h1 onClick={() => setMode('short')} className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === 'short' ? 'text-cyan-300': '' }`}>Pausa curta</h1>
                <h1 onClick={() => setMode('long')} className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === 'long' ? 'text-cyan-300' : ''}`} >Pausa Longa</h1>
            </div>
        
            {/* <div className="rounded-full border border-white w-60 h-60 flex items-center justify-center"> */}
            <Timer key={mode} DURATION={duration} colorClass={color}/>
            {/* </div> */}

        </div>
    );
}