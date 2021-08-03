import { CreatePost, Navbar, PostCard } from "../../components";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container">
          <CreatePost />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};
export default Home;
