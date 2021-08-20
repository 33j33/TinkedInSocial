import useCommentHook from "../../common/hooks/useCommentsHook";
import CommentSubmit from "../CommentSubmit/CommentSubmit";
import "./CommentBox.scss";

const CommentBox = ({ postId }) => {
  const { comments, loading, postComment } = useCommentHook({ postId });

  return (
    <div className="comment-box">
      <CommentSubmit postComment={postComment} postId={postId} />
      <div className="comments-wrapper">
        {loading && <h4>Loading...</h4>}
        {!loading &&
          comments?.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
      </div>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <img
        className="author-img"
        src="https://i.pravatar.cc/100?img=12"
        alt="profile-pic"
      />
      <div className="wrapper">
        <div className="author">
          <div className="author-details">
            <div className="author-name">{comment.name}</div>
            <div className="author-designation">
              {comment.designation || "Software Developer"}
            </div>
          </div>
          <div className="comment-timestamp">
            {new Date(comment.createdAt + 'Z').toLocaleString(["en-IN"], {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
        </div>
        <div className="comment-text">
          {comment.comment}
        </div>
      </div>
    </div>
  );
};
export default CommentBox;
