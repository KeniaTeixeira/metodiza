import Tree from "@/features/web/explorer/components/tree";

export default function Explorer() {
    return (
        <div className="w-[280px] shrink-0 h-screen bg-surface">
            <div className="p-3">
                <span className="text-sm text-text-muted uppercase">Notas</span>
            </div>
            <Tree />
        </div>
    );
}
