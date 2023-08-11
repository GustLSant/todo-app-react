import './ErrorPage.css'
import { IoListCircle } from "react-icons/io5"

function ErrorPage() {

    return (
        <div className="error-page">
            <h1>Something went wrong, please return to the <a href="/">Home Page</a></h1>

            <div>
                <IoListCircle size={'3.5em'} style={{color: 'var(--color-05)'}} />
                <h1>ToDoApp</h1>
            </div>
        </div>
    );
}

export default ErrorPage;