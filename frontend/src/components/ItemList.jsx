import Item from "./Item";

const ItemList = ({ list }) => {
  return (
    <div className="mb-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{list.name}</h2>
      </div>
      {list.items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
