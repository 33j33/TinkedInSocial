import { useState, useEffect } from "react";
import PostService from "../../services/post.service";

const useFeedHooks = ({ user, type }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({hasMore: false});
  const [sortBy, setSortBy] = useState("trending");
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    setPage(0);
    setLoading(true)
    try {
      const res = await PostService.fetchPosts({ params: { sortBy, type, page: 0, empId: user?.entity?.empId } })
      setPosts([...res.data.content, { tagCarousel: true }]);
      setMeta({ hasMore: !res.data.last});
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }
  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(prev => prev + 1);
    try {
      const res = await PostService.fetchPosts({ params: { sortBy, type, page: nextPage, empId: user?.entity?.empId } })
      setPosts([...posts, ...res.data.content, { tagCarousel: true }]);
      setMeta({ hasMore: !res.data.last});
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy])

  return { posts, loading, meta, sortBy, setSortBy, fetchMoreData }
}

export default useFeedHooks;