import { CreatePost, Navbar, PostCard, SortByDropdown, TagsCarousel } from "../../components";
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
          <TagsCarousel/>
        </div>
      </div>
    </>
  );
};
export default Home;
