import CommentSubmit from "../CommentSubmit/CommentSubmit";
import "./CommentBox.scss";

const CommentBox = () => {
  return (
    <div className="comment-box">
      <CommentSubmit />
      <div className="comments-wrapper">
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

const Comment = () => {
  return (
    <div className="comment">
      <img
        className="author-img"
        src="https://i.pravatar.cc/100?img=12"
        alt="profile-pic"
      />
      <div className="wrapper">
        <div className="author">
          <div className="author-name">John Doe</div>
          <div className="author-designation">Software Developer</div>
        </div>
        <div className="comment-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sit veniam suscipit consequuntur numquam assumenda similique quod libero. Perspiciatis quia ipsam aliquam! Omnis quia fugit optio illo repellat. Aliquid, fuga?</div>
      </div>
    </div>
  );
};
export default CommentBox;
