"use client";
import { useState } from "react";

export default function TaskItem({
  name, done, total,
  onDelete, onIncrement, onEdit
}: {
  name: string;
  done: number;
  total: number;
  onDelete?: () => void;
  onIncrement?: () => void;
  onEdit?: (updated: { name: string; total: number }) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editaNome, seteditaNome] = useState(name);
  const [editaNumCiclos, setEditaNumCiclos] = useState(total);

  const handleSave = () => {
    if (!editaNome.trim() || editaNumCiclos < done) return;
    onEdit?.({ name: editaNome.trim(), total: editaNumCiclos });
    setIsEditing(false);
  };
if (isEditing) {
  return (
    <div className="w-1/2 text-white px-4 py-2 rounded-lg mb-2">
      <input
        type="text"
        value={editaNome}
        onChange={(e) => seteditaNome(e.target.value)}
        className="w-full bg-gray-700 text-sm text-white px-4 py-2 rounded mb-2"
        placeholder="Nome da tarefa"/>
      <input
        type="number"
        min={done}
        value={editaNumCiclos}
        onChange={(e) => setEditaNumCiclos(Number(e.target.value))}
        className="w-full bg-gray-700 text-sm text-white px-4 py-2 rounded mb-2"
        placeholder="Total de ciclos"/>
      <div className="flex justify-end gap-4 text-sm">
        <button
          onClick={() => setIsEditing(false)}
          className="text-gray-400 hover:text-white">
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="text-cyan-400 hover:text-cyan-200">
          Salvar
        </button>
      </div>
    </div>
  );
}

 return (
  <div className="w-1/2">
    <div className="flex justify-between items-center w-full px-4 py-2 text-white rounded-lg mb-2">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-400">{done}/{total} ciclos</p>
      </div>
      <div className="flex space-x-2">
        {onIncrement && done < total && (
          <button
            onClick={onIncrement}
            className="text-green-400 hover:text-green-300 text-sm"
            title="Adicionar ciclo" >
            +1CICLO
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-400 hover:text-yellow-300 text-sm"
            title="Editar">
            EDITAR
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-red-400 hover:text-red-300 text-sm"
            title="Excluir">
            DEL
          </button>
        )}
      </div>
    </div>
  </div>
);
}