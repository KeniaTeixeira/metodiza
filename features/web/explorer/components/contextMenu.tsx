import useFileContextMenu from "@/features/web/explorer/hooks/fileContextMenuHook";
import useFolderContextMenu from "@/features/web/explorer/hooks/folderContextMenuHook";
import { Position } from "@/types/features/web/explorer/hooks/contextMenu";
import { FilePlus, FolderPlus, PenSquare, Trash } from "lucide-react";

export default function ContextMenu({
    pos,
    target,
}: {
    pos: Position | null;
    target: HTMLElement | null;
}) {
    if (!pos || !target) return;

    const entryElement = target.closest("*[data-entry-id]") as
        | HTMLElement
        | undefined;

    if (!entryElement) return;

    const id = entryElement.dataset.entryId!;
    const parent = entryElement.dataset.entryParent!;
    const type = entryElement.dataset.entryType!;
    const root = entryElement.dataset.entryRoot;

    return (
        <div
            className="fixed bg-border rounded-md z-1"
            data-name="context-menu"
            style={{
                top: pos.y,
                left: pos.x,
            }}
        >
            {type === "file" ? (
                <FileContextMenu id={id} parent={parent} />
            ) : (
                <FolderContextMenu id={id} parent={parent} root={!!root} />
            )}
        </div>
    );
}

function FileContextMenu({ id, parent }: { id: string; parent: string }) {
    const [handleRenameFile, handleDeleteFile] = useFileContextMenu(id, parent);

    return (
        <div className="flex [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:hover:bg-accent-primary/5 [&>div]:py-2 [&>div]:px-3">
            <div onClick={handleRenameFile}>
                <PenSquare width={15} />
            </div>
            <div onClick={handleDeleteFile}>
                <Trash width={15} />
            </div>
        </div>
    );
}

function FolderContextMenu({
    id,
    parent,
    root,
}: {
    id: string;
    parent: string;
    root?: boolean;
}) {
    const [
        handleCreateFile,
        handleCreateFolder,
        handleRenameFolder,
        handleDeleteFolder,
    ] = useFolderContextMenu(id, parent);

    return (
        <div className="flex [&>div]:cursor-pointer [&>div]:rounded-md [&>div]:hover:bg-accent-primary/5 [&>div]:py-2 [&>div]:px-3">
            <div onClick={handleCreateFile}>
                <FilePlus width={15} />
            </div>
            <div onClick={handleCreateFolder}>
                <FolderPlus width={15} />
            </div>
            {!root && (
                <>
                    <div onClick={handleRenameFolder}>
                        <PenSquare width={15} />
                    </div>
                    <div onClick={handleDeleteFolder}>
                        <Trash width={15} />
                    </div>
                </>
            )}
        </div>
    );
}
