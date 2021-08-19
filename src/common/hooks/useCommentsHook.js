import { useState, useEffect } from "react";
import PostService from "../../services/post.service";

const useCommentHook = ({ postId}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        PostService.getComments({postId})
            .then(res => {
                setComments(res.data);
            }, err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const postComment = async (payload) => {
        setLoading(true);
        PostService.addComment(payload)
            .then(res => {
                setComments([res.data, ...comments]);
            }, err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchComments();
    }, [])
    return {comments, loading, fetchComments, postComment }
}
export default useCommentHook;