interface ActionsProps{
    onEmpty: () => void;
    onSave: () => void;
}

export default function ResumeActions(actionProps: ActionsProps) {
    return (
        <div className="regular-block">
            <button className="empty-btn" onClick={()=> actionProps.onEmpty()}>Clear Data</button>
            <button className="save-resume" onClick={()=>actionProps.onSave()}>Save Resume</button>
        </div>
    )
}