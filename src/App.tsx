import { MuiSortDialog, MuiSortDialogPayload, MuiSortDialogRenderContainerProps, MuiSortDialogRenderDialogActionsProps, MuiSortDialogRenderItemProps } from '@masa-dev/mui-sort-dialog';
import { Paper } from '@mui/material';
import { DialogsProvider, useDialogs } from '@toolpad/core';
import { CSSProperties } from 'react';

type ItemType = {
    name: string;
    age: number;
}

const items: ItemType[] = [
    { name: 'aaa', age: 10 },
    { name: 'bbb', age: 20 },
    { name: 'ccc', age: 30 },
]

function App() {
    return <DialogsProvider>
        <div style={{ display: 'flex', gap: 3, justifyContent: "center" }}>
            <Minimum />
            <WithRenderItem />
            <WithRenderContainer />
            <WithRenderActions />
        </div>
    </DialogsProvider>
}

function Minimum() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const payload: MuiSortDialogPayload<ItemType> = { items }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>Minimum</button>
}

function WithRenderItem() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const style: CSSProperties = { border: "1px solid #aaa", padding: "0.5em 1em" }
        const renderItem = (props: MuiSortDialogRenderItemProps<ItemType>) => <Paper sx={{ ...style, ...props.handlerProps.style }}>
            <div {...props.handlerProps} style={{ cursor: "pointer", background: "#ddd", marginBottom: "2em" }}>++ DRAG ME ++</div>
            <span style={{ fontSize: "1.2em" }}>{props.item.name}:</span>
            <span style={{ color: "green", fontSize: "0.8em", fontWeight: "bold" }}>{props.item.age}</span>
        </Paper>
        const payload: MuiSortDialogPayload<ItemType> = { items, renderItem }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>With Render Item</button>
}

function WithRenderContainer() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const renderContainer = (props: MuiSortDialogRenderContainerProps) => <div style={{ display: 'flex', flexDirection: "column", gap: 3 }}>{props.items}</div>
        const payload: MuiSortDialogPayload<ItemType> = { items, renderContainer }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>With Render Container</button>
}

function WithRenderActions() {
    const dlgs = useDialogs();

    const handleClick = async () => {
        const renderDialogActions = (props: MuiSortDialogRenderDialogActionsProps) => <div>
            <button onClick={props.onCancel} style={{ background: "red" }}>Cancel</button>
            <button onClick={props.onOk} style={{ background: "blue" }}>OK</button>
        </div>
        const payload: MuiSortDialogPayload<ItemType> = { items, renderDialogActions }
        const res = await dlgs.open(MuiSortDialog<ItemType>, payload)
        dlgs.alert(JSON.stringify(res), { title: 'Sort Result' })
    };

    return <button onClick={handleClick}>With Render Actions</button>
}

export default App
