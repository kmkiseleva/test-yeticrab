import { useSelector } from "react-redux";
import { RootState } from "../store";

const Counter = () => {
  const { items } = useSelector((state: RootState) => state.requests);

  return (
    <div className="counter">
      Всего <span>{items.length}</span>{" "}
      {items.length === 1
        ? "заявка"
        : items.length === 0 || items.length > 4
        ? "заявок"
        : "заявки"}
    </div>
  );
};

export default Counter;
