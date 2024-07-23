// import { IconType } from "react-icons";

const CategoryBox = ({
  label,
  icon: Icon,
  selectedCategory,
  handleCategories,
  categoriesObject,
}) => {
  return (
    <div
      onClick={() => handleCategories(label)}
      className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
        ${
          categoriesObject[label] === selectedCategory
            ? "border-b-neutral-800"
            : "border-transparent"
        }
        ${categoriesObject[label] === selectedCategory ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      {<Icon size={20} />}
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
