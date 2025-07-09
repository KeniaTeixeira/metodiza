"use client";
import { useState } from "react";
import Timer from "./components/Timer";
import Image from "next/image";
import Task from "./components/task";
import TaskItem from "./components/taskItem";

export default function Page() {
    const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos
    const [shortBreakTime, setShortBreakTime] = useState(10 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);
    const [tasks, setTasks] = useState<{ name: string; done: number; total: number }[]>([]);

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
        <div className="flex flex-col items-center justify-center">
            <div className="flex pt-10 space-x-10">
                <h1
                    onClick={() => setMode("pomodoro")}
                    className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === "pomodoro" ? "text-cyan-300" : ""}`}
                >
                    Pomodoro
                </h1>
                <h1
                    onClick={() => setMode("short")}
                    className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === "short" ? "text-cyan-300" : ""}`}
                >
                    Pausa curta
                </h1>
                <h1
                    onClick={() => setMode("long")}
                    className={`hover:text-cyan-300 cursor-pointer underline underline-offset-7 ${mode === "long" ? "text-cyan-300" : ""}`}
                >
                    Pausa Longa
                </h1>
            </div>

            {/* <div className="rounded-full border border-white w-60 h-60 flex items-center justify-center"> */}
            <Timer key={mode} DURATION={duration} colorClass={color} />
            {/* </div> */}

            {/* Parte pra adiconar tarefas*/}
            <div className="w-full flex flex-col items-center justify-center">
                <div className="flex justify-between items-center w-1/2 mt-8">
                    <h1>TAREFAS</h1>
                    <Image 
                        src="/agenda.svg" 
                        alt="Ícone" 
                        width={20} 
                        height={20} 
                        className="cursor-pointer"
                        onClick={() => setShowTaskModal(true)}
                    />
                </div>
                <hr className="border-t border-cyan-300 w-1/2 mt-2" />
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
                onDelete={() => {
                const updated = tasks.filter((_, i) => i !== index);
                setTasks(updated);
                }}
                onEdit={({ name, total }) => {
                const updated = [...tasks];
                updated[index] = { ...updated[index], name, total };
                setTasks(updated);
                }}
            />
            ))}


        </div>
    );
}



{/**
    Tirar a possibilidade de tempos negativos 
    contar os ciclos a cada tempo sozinho
    deixar permanente o tempo colocado no modal //quando acaba volta ao estado original setado no codigo
    mudar os icones
    colocar o icone da tarefa concluida quando for
    possibilitar a escolha da tarefa para a contagem
    colocar um modal de confirmação para excluir a tarefa
    */}