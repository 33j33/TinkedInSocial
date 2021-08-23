import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  ColleagueCarousel,
  CreatePost,
  Navbar,
  PostCard,
  SortByDropdown,
  TagsCarousel,
} from "../../components";
import { userSelector } from "../../selectors/user.selector";
import useFeedHook from "../../common/hooks/useFeedHook";
import "./Home.scss";
import Spinner from "../../components/Spinner/Spinner";
import { useEffect } from "react";
import { fetchSuggestedUsers } from "../../redux/recommendation/recommendation.action";

const Home = () => {
  // const {isLoggedIn} = useSelector(state => state.user);
  // if (!isLoggedIn) {
  //   return <Redirect to="/signin"/>
  // }
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const { posts, loading, meta, sortBy, setSortBy, fetchData, fetchMoreData } =
    useFeedHook({ empId: user.entity.empId, type: "feed" });

  useEffect(() => {
    dispatch(fetchSuggestedUsers({ id: user.entity?.empId }));
  }, []);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="container">
          <CreatePost />
          <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
          {loading && <Spinner />}
          {!loading && posts.length !== 0 && (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={meta.hasMore}
              loader={<Spinner />}
              endMessage={<h3>No More Posts</h3>}
            >
              {posts?.map((o, idx) => {
                if (o.tagCarousel) {
                  return <TagsCarousel key={idx} fetchPosts={fetchData} />;
                }
                if (o.colleagueCarousel) {
                  return <ColleagueCarousel />;
                }
                return <PostCard key={idx} post={o} />;
              })}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
