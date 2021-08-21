import { Divider, Tag } from "antd";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFeedHook from "../../common/hooks/useFeedHook";
import { Navbar, PostCard } from "../../components";
import Spinner from "../../components/Spinner/Spinner";
import { userSelector } from "../../selectors/user.selector";
import "./TagFeed.scss";

const TagFeed = () => {
  const { tag } = useParams();
  const [tagState] = useState(tag);

  const user = useSelector(userSelector);
  const { posts, loading, meta, fetchMoreData } = useFeedHook({
    empId: user.entity.empId,
    type: "feed",
    tag: tagState,
  });

  return (
    <>
      <Navbar />
      <div className="tag-feed">
        <Divider dashed orientation="left">
          #{tag}
        </Divider>
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
                return null;
              }
              return <PostCard key={idx} post={o} />;
            })}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default TagFeed;
