import './Home.css'
import { IoListCircle, IoMenu } from "react-icons/io5"


function Home() {
    return (
        <div className="home">
            <p>Click on the <IoMenu /> icon in the top left corner to select a day of the week and start making your lists </p>
            
            <div>
                <IoListCircle size={'3.5em'} style={{color: 'var(--color-05)'}} />
                <h1>ToDoApp</h1>
            </div>
        </div>
    );
}

export default Home;