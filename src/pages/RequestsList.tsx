import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import AddRequestForm from "../components/AddRequestForm";
import Request from "../components/Request";
import Counter from "../components/Counter";
import {
  fetchRequests,
  sortById,
  sortByСlientCompanyName,
} from "../store/requestsReducer";

const RequestsList = () => {
  const dispatch = useDispatch();

  const { admin, loading, error, items } = useSelector(
    (state: RootState) => state.requests
  );
  const [visible, setVisible] = useState(false);
  const [searchInputVisible, setSearchInputVisible] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setFilter(filter);
    }
  };

  return (
    <>
      <div className="requests-search-add-bar">
        <div className="search-request">
          Поиск по названию фирмы или ФИО перевозчика
          <button
            type="button"
            onClick={() => setSearchInputVisible(!searchInputVisible)}
          >
            <i className="small material-icons">search</i>
          </button>
          {searchInputVisible && (
            <input
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              type="text"
              id="filter"
              onKeyPress={keyPressHandler}
            />
          )}
        </div>
        {admin && (
          <div className="add-request">
            Добавить заявку
            <button type="button" onClick={() => setVisible(!visible)}>
              <i className="small material-icons">add_circle_outline</i>
            </button>
          </div>
        )}
      </div>

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

      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}

      {error && <h3>Ошибка соединения с сервером...</h3>}

      {visible && admin && <AddRequestForm />}

      {!loading && (
        <div className="requests">
          <table className="striped">
            <thead>
              <tr>
                <th>Номер заявки</th>
                <th>Дата и время получения заявки от клиента</th>
                <th>Название фирмы клиента</th>
                <th>ФИО перевозчика</th>
                <th>Контактный телефон перевозчика</th>
                <th>Комментарии</th>
                <th>ATI код сети перевозчика</th>
              </tr>
            </thead>

            <tbody>
              {!filter &&
                items.map((item) => <Request key={item.id} item={item} />)}
              {filter &&
                items
                  .filter(
                    (item) =>
                      item.clientCompanyName
                        .toLowerCase()
                        .includes(filter.toLowerCase()) ||
                      item.driverInitials
                        .toLowerCase()
                        .includes(filter.toLowerCase()) ||
                      item.driverPhone
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                  )
                  .map((item) => <Request key={item.id} item={item} />)}
            </tbody>
          </table>
        </div>
      )}

      <Counter />
    </>
  );
};

export default RequestsList;
