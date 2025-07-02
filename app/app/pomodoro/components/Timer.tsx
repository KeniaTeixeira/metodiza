"use client";
import { useState, useEffect } from "react";

export default function Timer({ DURATION, colorClass}: TimeProps){
  const [reiniciar] = useState(DURATION);
  const [seconds, setSeconds] = useState(DURATION);
  const [executando, setExecutando] = useState(false);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (!executando) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExecutando(false);
          setSeconds(reiniciar);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [executando, reiniciar]);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handlePause = () => {
    setExecutando(false);
    setPausado(true);
  };

  const handleStart = () => {
    setExecutando(true);
    setPausado(false);
  };

  const handleReset = () => {
    setSeconds(DURATION);
    setExecutando(false);
    setPausado(false);
  };

return (
    <div className="flex flex-col items-center space-y-6 pt-15">
      {/* TEMPO */}
      <div className="rounded-full border-2 border-cyan-600 w-50 h-50 flex items-center justify-center">
        <div className={`text-6xl ${colorClass}`}>
          {formatTime(seconds)}
        </div>
      </div>

      {/* BOTÕES*/}
      <div className="text-center space-y-4">
        {!executando && !pausado && (
          <button
            onClick={handleStart}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-2xl">COMEÇAR
          </button>
        )}

        {executando && (
          <button
            onClick={handlePause}
            className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-2 rounded-2xl">Pausar
          </button>
        )}

        {!executando && pausado && (
          <div className="flex justify-center gap-3">
            <button
              onClick={handleStart}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-2xl">Voltar
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl">Reiniciar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface TimeProps{
  DURATION: number;
  colorClass: string;
}