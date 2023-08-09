import './ImportTasksPage.css'
import Button01 from "../components/Button01/Button01"
import { IoArchiveOutline } from "react-icons/io5"




function ImportTasksPage() {
    return (
        <div className="import-tasks-page">
            <h2>Import Tasks</h2>
            <input type="file" />
            <Button01 label={'Import Tasks'} icon={<IoArchiveOutline size={'22px'} />} />
        </div>
    );
}

export default ImportTasksPage;