import './Home.css'
import { IoListCircle, IoMenu } from "react-icons/io5"


function Home() {
    return (
        <div className="home">
            <p>Click on the <IoMenu /> icon in the top left corner to select a day of the week and start making your lists </p>
            
            <div className='home__logo'>
                <IoListCircle size={'3.5em'} />
                <h1>ToDoApp</h1>
            </div>

            <div className="credits-container">
                <p>WebApp made by Gustavo Lucas Santana</p>
                <p>FavIcon made by <a href="https://www.flaticon.com/authors/freepik" target='_blank' rel='noreferrer'>Freepik</a> from <a href="https://www.flaticon.com/" target='_blank' rel='noreferrer'>www.flaticon.com</a></p>
            </div>
        </div>
    );
}

export default Home;