import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userSelector } from "../../selectors/user.selector";
import Spinner from "../Spinner/Spinner";
import "./ColleagueCarousel.scss";

const ColleagueCarousel = () => {
  const history = useHistory();
  const _user = useSelector(userSelector);
  const suggestedUsers = useSelector((state) => state.suggestedUsers);
  const loader = useSelector((state) => state.loaders["recommendation/fetch"]);
  
  const handleCardClick = (user) => {
    if (user.empId === _user.entity.empId) {
      history.push("/profile");
    } else if (user.empId !== _user.entity.empId) {
      history.push(`/user/${user.empId}`);
    }
  };
  return (
    <div className="carousel-wrapper">
      <div className="heading">Suggested Users</div>
      <div className="cards">
        {loader && <Spinner />}
        {!loader &&
          suggestedUsers?.map((user, idx) => (
            <Card user={user} key={idx} handleCardClick={handleCardClick} />
          ))}
      </div>
    </div>
  );
};

const Card = ({ user, handleCardClick }) => {
  return (
    <div className="profile-card" onClick={() => handleCardClick(user)}>
      <div className="background"></div>
      <div className="details">
        <div className="name">{user.name}</div>
        <div className="designation">{user.designation}</div>
        <div className="team">{user.team}</div>
      </div>
      <img
        className="profile-pic"
        src={user.imgUrl}
        alt="pic"
        style={{ background: "black" }}
      />
    </div>
  );
};
export default ColleagueCarousel;
