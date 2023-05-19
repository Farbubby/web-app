import { useState } from "react";
import FoodList from "./FoodList";

interface Props {
  list: string[];
}

function FoodSelection({ list }: Props) {
  const [option, setOption] = useState("Meats");
  const str = "border border-black rounded-lg px-2 py-0.5 duration-300 ";
  const foodList = list.map((items) => (
    <button
      className={
        items === option
          ? str + "bg-black text-white"
          : str + "hover:bg-black hover:text-white"
      }
      key={items}
      onClick={() => setOption(items)}>
      {items}
    </button>
  ));

  return (
    <>
      <div className="mt-4 flex flex-row gap-5 ml-2">{foodList}</div>
      <div>
        {option === list[0] && <FoodList type={option} />}
        {option === list[1] && <FoodList type={option} />}
        {option === list[2] && <FoodList type={option} />}
        {option === list[3] && <FoodList type={option} />}
      </div>
    </>
  );
}

export default FoodSelection;
