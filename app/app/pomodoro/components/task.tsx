"use client";
import { useEffect, useState } from "react";

export default function Task({
  isOpen,onClose,
  pomodoro, short, long,
  setPomodoro, setShort, setLong,
  tasks, setTasks
}: {
  isOpen: boolean;
  onClose: () => void;
  pomodoro: number;
  short: number;
  long: number;
  setPomodoro: (min: number) => void;
  setShort: (min: number) => void;
  setLong: (min: number) => void;
  tasks: { name: string; done: number; total: number }[];
  setTasks: (tasks: { name: string; done: number; total: number }[]) => void;
}) {
  const [localPomodoro, setLocalPomodoro] = useState(pomodoro);
  const [localShort, setLocalShort] = useState(short);
  const [localLong, setLocalLong] = useState(long);

  const [novaTask, setnovaTask] = useState(false);
  const [novoNomeTask, setnovoNomeTask] = useState("");
  const [cicloTask, setcicloTask] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setLocalPomodoro(pomodoro);
      setLocalShort(short);
      setLocalLong(long);
    }
  }, [isOpen, pomodoro, short, long]);

  const salvarConfiguracoes = () => {
    setPomodoro(localPomodoro);
    setShort(localShort);
    setLong(localLong);
    onClose();
  };

  const handleAddTask = () => {
    if (!novoNomeTask.trim()) return;
    const newTask = {
      name: novoNomeTask.trim(),
      total: cicloTask,
      done: 0
    };
    setTasks([...tasks, newTask]);
    setnovoNomeTask("");
    setcicloTask(1);
    setnovaTask(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-[#3C3F51] text-white rounded-xl p-7 w-[400px] relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">×</button>
        <h2 className="text-sm text-gray-400 mb-2">Editar Pomodoro</h2>

        {/* Tempos */}
        <div className="border-t border-gray-500 mb-4 pt-2">
          <div className="text-xs text-gray-300 uppercase mb-2">Tempo</div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div>Pomodoro</div>
              <input
                type="number"
                value={localPomodoro}
                onChange={(e) => setLocalPomodoro(Number(e.target.value))}
                className="bg-transparent border-none text-center w-full text-white"/>
            </div>
            <div>
              <div>Pausa curta</div>
              <input
                type="number"
                value={localShort}
                onChange={(e) => setLocalShort(Number(e.target.value))}
                className="bg-transparent border-none text-center w-full text-white"/>
            </div>
            <div>
              <div>Pausa longa</div>
              <input
                type="number"
                value={localLong}
                onChange={(e) => setLocalLong(Number(e.target.value))}
                className="bg-transparent border-none text-center w-full text-white"
              />
            </div>
          </div>
        </div>

        {/* ----------- Tarefas */}
        <div className="border-t border-gray-500 pt-2">
          <div className="text-xs text-gray-300 uppercase mb-2">Tarefas</div>
          <ul className="space-y-1 text-sm">
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between">
                <span>{task.name}</span>
                <span>{task.done}/{task.total}</span>
              </li>
            ))}

            {/* ----------- Formulário de nova tarefa */}
            {novaTask ? (
              <li className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Nome da tarefa"
                  value={novoNomeTask}
                  onChange={(e) => setnovoNomeTask(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white text-sm px-2 py-1 rounded"/>
                <input
                  type="number"
                  min={1}
                  value={cicloTask}
                  onChange={(e) => setcicloTask(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 text-white text-sm px-2 py-1 rounded"
                  placeholder="Pomodoros"
                />
                <div className="flex justify-end gap-2 text-sm">
                  <button
                    onClick={() => setnovaTask(false)}
                    className="text-gray-400 hover:text-white">
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="text-cyan-400 hover:text-cyan-200">
                    Salvar
                  </button>
                </div>
              </li>
            ) : (
              <li
                className="text-gray-400 pt-2 italic cursor-pointer hover:text-white" onClick={() => setnovaTask(true)} >
                Adicionar tarefa
              </li>
            )}
          </ul>
        </div>
        <div className="flex justify-center">
        <button
          onClick={salvarConfiguracoes}
          className="mt-6 w-40 border border-cyan-400 text-white py-2 rounded-lg hover:bg-cyan-500 transition">
          SALVAR
        </button>
        </div>
      </div>
    </div>
  );
}
