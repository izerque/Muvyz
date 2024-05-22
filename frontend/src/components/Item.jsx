import { FaEdit } from "react-icons/fa";
const Item = ({ item }) => {
  return (
    <div className="border-b-gray-900 p-2 mb-1 flex items-center  justify-between ">
      {item} <FaEdit />
    </div>
  );
};

export default Item;
