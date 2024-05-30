import { useState } from "react";
import ItemList from "./ItemList";
import { FaPlus } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const ItemsLists = () => {
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [newItem, setNewItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const addList = () => {
    if (newList) {
      setLists([...lists, { name: newList, items: [] }]);
      setNewList("");
    }
  };

  const addItemToList = () => {
    if (newItem && selectedList) {
      const updatedLists = lists.map((list) =>
        list.name === selectedList
          ? { ...list, items: [...list.items, newItem] }
          : list
      );
      setLists(updatedLists);
      setNewItem("");
    }
  };

  return (
    <div className="p-4 w-[600px] min-h-screen bg-gray-200 mx-auto my-10 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Lists</h1>
        <div>
          {isOpen ? (
            <FaTimes onClick={toggle} className="cursor-pointer text-red-500" />
          ) : (
            <FaPlus onClick={toggle} className="cursor-pointer text-blue-500" />
          )}
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="flex px-3 py-1.5 bg-white shadow-inner justify-between rounded-full text-sm mb-4">
            <input
              type="text"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              placeholder="Add a new List"
              className="flex-grow px-3 outline-none"
            />
            <button
              onClick={addList}
              className="bg-gray-500 rounded-full text-white p-2 "
            >
              Add List
            </button>
          </div>

          <div className="flex justify-between space-x-5 items-center mb-4">
            {/* <div className="flex-grow p-2 bg-white rounded-full"> */}
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className="flex-grow p-2 rounded-full px-4 outline-none"
            >
              <option value="">Select a category</option>
              {lists.map((list, index) => (
                <option key={index} value={list.name}>
                  {list.name}
                </option>
              ))}
            </select>
            {/* </div> */}
            <div className="bg-white rounded-full border px-2 py-1">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add a new item"
                className=" p-1 flex-grow outline-none"
              />
              <button
                onClick={addItemToList}
                className="bg-green-500 text-sm text-white p-1 rounded-full"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
      {lists.map((list, index) => (
        <ItemList key={index} list={list} />
      ))}
    </div>
  );
};

export default ItemsLists;
