import { CreatePost, Navbar, PostCard, SortByDropdown } from "../../components";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container">
          <CreatePost />
          <SortByDropdown/>
          <PostCard />
          <PostCard />
        </div>
      </div>
    </>
  );
};
export default Home;
