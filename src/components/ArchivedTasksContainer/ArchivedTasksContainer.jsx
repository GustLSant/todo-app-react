import './ArchivedTasksContainer.css'
import { useParams } from "react-router-dom"


function ArchivedTasksContainer() {
    const { day } = useParams() //esse id tem q ser igual ao parametro q eh definido no router

    return (
        <div className="at-container">
            <h1>Archived Tasks Container / day: {day}</h1>

        </div>
    );
}

export default ArchivedTasksContainer;