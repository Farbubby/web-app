import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getList, getCart, addItem, removeItem } from "../api/functions";

interface Props {
  type: string;
}

function FoodList({ type }: Props) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["food", type],
    queryFn: () => getList(type),
  });

  const add = useMutation({
    mutationFn: (data: any) => addItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const remove = useMutation({
    mutationFn: (data: any) => removeItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError)
    return <div>An error has occurred: {JSON.stringify(query.error)}</div>;

  const list = query.data.map((item: any) => (
    <div
      className="flex flex-col px-1 py-2 gap-1 border-2 border-black transition ease-in-out hover:scale-105 hover:shadow-lg rounded-lg w-48 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 to-gray-600"
      key={item.name}>
      <div>{item.name}</div>
      <div>${item.price}</div>
      <div className="flex flex-row justify-center gap-4">
        <button
          className="border-2 border-black rounded-lg h-6 w-6 hover:bg-orange-300 duration-300"
          onClick={() => add.mutate(item)}>
          +
        </button>
        <button
          className="border-2 border-black rounded-lg h-6 w-6 hover:bg-orange-300 duration-300"
          onClick={() => remove.mutate(item)}>
          -
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className="grid grid-cols-4 gap-y-4 gap-x-10 w-max">{list}</div>
    </>
  );
}

export default FoodList;
