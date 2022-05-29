import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { sortById, sortByСlientCompanyName } from "../store/requestsReducer";

const SortBlock = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.requests);

  return (
    <div className="sort__block">
      <button
        className="btn waves-effect waves-light pink darken-3"
        onClick={() => dispatch(sortById(items))}
      >
        Сортировать по номеру заявки
      </button>
      <button
        className="btn waves-effect waves-light pink darken-3"
        onClick={() => dispatch(sortByСlientCompanyName(items))}
      >
        Сортировать по фирме
      </button>
    </div>
  );
};

export default SortBlock;
