import {Navbar, PostCard} from "../../components";
import "./Home.scss"

const Home = () => {
    return (
        <>
            <Navbar/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <PostCard />
            </div>
        </>
    )
}
export default Home