"use client";
import { useState } from "react";
import Timer from "./timer";
import Image from "next/image";
import Task from "./task";
import TaskItem from "./taskItem";

export default function Page() {
    const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos
    const [shortBreakTime, setShortBreakTime] = useState(10 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);
    const [tasks, setTasks] = useState<{ name: string; done: number; total: number }[]>([]);
    const [taskToDelete, setTaskToDelete] = useState< number | null>(null);

    const getSetting = () => {
        switch (mode) {
            case "short":
                return { duration: shortBreakTime, color: "text-blue-400" };
            case "long":
                return { duration: longBreakTime, color: "text-blue-400" };
            default:
                return { duration: pomodoroTime, color: "text-white" };
        }
    };

    const { duration, color } = getSetting();

    return (
        <div className="w-full mx-auto px-4 overflow-y-auto">
            {/*Tempo dos pomos */}
            <div className="flex justify-center pt-10 space-x-10">
                <h1
                    onClick={() => setMode("pomodoro")}
                    className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === "pomodoro" ? "text-cyan-300" : ""}`}>
                    Pomodoro
                </h1>
                <h1
                    onClick={() => setMode("short")}
                    className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === "short" ? "text-cyan-300" : ""}`}>
                    Pausa curta
                </h1>
                <h1
                    onClick={() => setMode("long")}
                    className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === "long" ? "text-cyan-300" : ""}`}>
                    Pausa Longa
                </h1>
            </div>

            <Timer key={mode} DURATION={duration} colorClass={color} />

            {/* Parte pra adiconar tarefas*/}
            <div className="w-full mt-8 flex flex-col items-center">
                <div className="flex justify-between items-center w-full max-w-md px-4">
                    <h1>TAREFAS</h1>
                    <Image 
                        src="/svg/editarPomodoro.svg" 
                        alt="Ícone" 
                        width={20} 
                        height={20} 
                        className="cursor-pointer"
                        onClick={() => setShowTaskModal(true)}
                    />
                </div>
                <hr className="border-t border-cyan-300 w-full max-w-lg mt-2" />
            </div>
            <Task 
                isOpen={showTaskModal} 
                onClose={() => setShowTaskModal(false)}
                pomodoro={pomodoroTime / 60}
                short={shortBreakTime / 60}
                long={longBreakTime / 60}
                setPomodoro={(min: number) => setPomodoroTime(min * 60)}
                setShort={(min: number) => setShortBreakTime(min * 60)}
                setLong={(min: number) => setLongBreakTime(min * 60)}
                tasks={tasks}
                setTasks={setTasks}
            />
            <div className="w-full flex flex-col items-center mt-4">
            {tasks.map((task, index) => (

            <TaskItem
                key={index}
                name={task.name}
                done={task.done}
                total={task.total}
                onIncrement={() => {
                const updated = [...tasks];
                if (updated[index].done < updated[index].total) {
                    updated[index].done++;
                    setTasks(updated);
                }
                }}
                onDelete={() => setTaskToDelete(index)}
                onEdit={({ name, total }) => {
                const updated = [...tasks];
                updated[index] = { ...updated[index], name, total };
                setTasks(updated);
                }}
            />
            ))}

            {/*Pra confirmar o delete */}
            {taskToDelete !== null && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-[#1f2127] p-6 rounded-xl shadow-xl w-full max-w-xs text-center">
                        <h2 className="text-lg font-bold text-white mb-4">
                        Tem certeza que deseja apagar <span className="text-cyan-300">"{tasks[taskToDelete!]?.name}"</span>?
                        </h2>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded" 
                            onClick={() => setTaskToDelete(null)}>
                            Cancelar </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded"
                            onClick={() => {
                                const updated = tasks.filter((_, i) => i !== taskToDelete);
                                setTasks(updated);
                                setTaskToDelete(null);
                            }}
                            > Apagar </button>
                        </div>
                    </div>
                </div>
            )}
            </div>

    </div>
    );
}



{/**
    contar os ciclos a cada tempo sozinho
    mudar os icones
    colocar o icone da tarefa concluida quando for
    possibilitar a escolha da tarefa para a contagem
*/}