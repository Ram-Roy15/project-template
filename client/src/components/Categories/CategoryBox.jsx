import PropTypes from "prop-types";
import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  // console.log(params);
  const category = params.get("category");

  console.log(category === label);
  const handleClick = () => {
    let currentCategory = { category: label };

    const url = queryString.stringifyUrl({
      url: "/",
      query: currentCategory,
    });
    // console.log(url);
    navigate(url);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer  ${
    category === label && "text-neutral-800 border-b-neutral-800"
  }`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
