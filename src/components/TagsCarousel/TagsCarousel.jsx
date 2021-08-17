import { useState } from "react";
import { Button, Tag, Tooltip } from "antd";
import "./TagsCarousel.scss";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFilled } from "@ant-design/icons";
import { userSelector } from "../../selectors/user.selector";
import { updateInterests } from "../../redux/user/user.actions";

const TagsCarousel = () => {
  const { CheckableTag } = Tag;
  const tags = useSelector(state => state.common?.tags);
  const user = useSelector(userSelector);
  const loader = useSelector(state => state.loaders["user_interests/update"]);
  const dispatch = useDispatch();
  const [selectedTags, setSelectedTags] = useState(user.entity.interests);

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  const handleSave = () => {
    dispatch(updateInterests({ body: selectedTags }));
  }

  return (
    <div className="scrolling-wrapper">
      {tags?.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selectedTags?.indexOf(tag) > -1}
          onChange={(checked) => handleTagChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
      <div className="save-btn">
        <Tooltip title="Update Interests" color="rgba(31,18,53,0.6)">
          <Button loading={loader} shape="round" icon={<CheckCircleFilled />} type="primary" size="small" onClick={handleSave}>Apply</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TagsCarousel;
