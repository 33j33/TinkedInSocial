import { useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import "./TagsCarousel.scss";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFilled } from "@ant-design/icons";
import { userSelector } from "../../selectors/user.selector";
import { updateInterests } from "../../redux/user/user.actions";

const TagsCarousel = ({ fetchPosts }) => {
  const { CheckableTag } = Tag;
  const dispatch = useDispatch();

  // selectors
  const tags = useSelector((state) => state.common?.tags);
  const user = useSelector(userSelector);
  const loader = useSelector((state) => state.loaders["user_interests/update"]);

  // state
  const [selectedTags, setSelectedTags] = useState(user.entity.interests);

  // handlers
  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const handleSave = () => {
    dispatch(
      updateInterests(
        { body: { tags: selectedTags, empId: user?.entity?.empId } },
        fetchPosts
      )
    );
  };

  return (
    <div className="scrolling-wrapper">
      <div className="tags">
        {tags?.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags?.indexOf(tag) > -1}
            onChange={(checked) => handleTagChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>

      <div className="save-btn">
        <Tooltip title="Update Interests" color="rgba(31,18,53,0.6)">
          <Button
            loading={loader}
            shape="round"
            icon={<CheckCircleFilled />}
            type="primary"
            size="small"
            onClick={handleSave}
          >
            Apply
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TagsCarousel;
