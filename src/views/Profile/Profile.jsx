import { Divider } from "antd";
import { useSelector } from "react-redux";
import useFeedHook from "../../common/hooks/useFeedHook";
import { Navbar, PostCard, ProfileHeader, SortByDropdown, TagsCarousel } from "../../components";
import { userSelector } from "../../selectors/user.selector";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./Profile.scss";

const Profile = () => {
  // const {isLoggedIn} = useSelector(state => state.user);
  // if (!isLoggedIn) {
  //   return <Redirect to="/signin"/>
  // }
  const user = useSelector(userSelector);
  const { posts, meta, sortBy, setSortBy, fetchMoreData } = useFeedHook({ user, type: 'self' });
  console.log("meta", meta)
  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <ProfileHeader />
        {/* <Divider orientation="right">User Activity</Divider> */}
        <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={meta.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<h3>No More Posts</h3>}
        >
          {
            posts?.map((o, idx) => {
              if (o.tagCarousel) {
                return <TagsCarousel key={idx}/>
              }
              return <PostCard key={idx} post={o} />
            })
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default Profile;