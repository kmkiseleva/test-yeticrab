import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import Request from "../components/Request";
import {
  fetchRequests,
  addNewRequest,
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

  const [clientCompanyName, setClientCompanyName] = useState("");
  const [driverInitials, setDriverInitials] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [comments, setComments] = useState("");
  const [atiCode, setAtiCode] = useState("");

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const resetForm = () => {
    setClientCompanyName("");
    setDriverInitials("");
    setDriverPhone("");
    setComments("");
    setAtiCode("");
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setFilter(filter);
    }
  };

  const onSubmitDataHandler = (e: any): void => {
    e.preventDefault();
    if (clientCompanyName && driverInitials && driverPhone && atiCode) {
      dispatch(
        addNewRequest({
          clientCompanyName,
          driverInitials,
          driverPhone,
          comments,
          atiCode,
        })
      );
      dispatch(fetchRequests());
      resetForm();
      setVisible(false);
    } else {
      alert("Введите данные...");
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

      {visible && admin && (
        <div className="add-request-form">
          <label htmlFor="title" className="active">
            Название фирмы клиента
          </label>
          <input
            onChange={(e) => setClientCompanyName(e.target.value)}
            value={clientCompanyName}
            type="text"
            id="name"
          />
          <label htmlFor="title" className="active">
            ФИО перевозчика
          </label>
          <input
            onChange={(e) => setDriverInitials(e.target.value)}
            value={driverInitials}
            type="text"
            id="surname"
          />
          <label htmlFor="title" className="active">
            Контактный телефон перевозчика
          </label>
          <input
            onChange={(e) => setDriverPhone(e.target.value)}
            value={driverPhone}
            type="text"
            id="number"
            placeholder="+79995554433"
          />
          <label htmlFor="title" className="active">
            Комментарии
          </label>
          <input
            onChange={(e) => setComments(e.target.value)}
            value={comments}
            type="text"
            id="comments"
          />
          <label htmlFor="title" className="active">
            ATI код сети перевозчика
          </label>
          <input
            onChange={(e) => setAtiCode(e.target.value)}
            value={atiCode}
            type="text"
            id="atiCode"
          />
          <button
            className="btn waves-effect waves-light pink darken-3 right"
            type="submit"
            onClick={(e) => onSubmitDataHandler(e)}
          >
            Сохранить заявку
            <i className="material-icons right">send</i>
          </button>
        </div>
      )}

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

      <div className="counter">
        Всего <span>{items.length}</span>{" "}
        {items.length === 1
          ? "заявка"
          : items.length === 0 || items.length > 4
          ? "заявок"
          : "заявки"}
      </div>
    </>
  );
};

export default RequestsList;
