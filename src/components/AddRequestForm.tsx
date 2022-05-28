import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchRequests, addNewRequest } from "../store/requestsReducer";

const AddRequestForm = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(true);
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

  const validatePhone = (phone: string) => {
    let regex =
      /^(\+7)?[\s]?\(?[489][0-9]{2}\)?[\s]?[0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}$/;
    return regex.test(phone);
  };

  const onSubmitDataHandler = (e: any): void => {
    e.preventDefault();
    if (
      clientCompanyName &&
      driverInitials &&
      driverPhone &&
      atiCode &&
      validatePhone(driverPhone)
    ) {
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
      if (validatePhone(driverPhone)) alert("Введите данные...");
      else if (!validatePhone(driverPhone))
        alert("Некорректный номер телефона");
    }
  };

  return (
    <>
      {visible && (
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
            type="tel"
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
    </>
  );
};

export default AddRequestForm;
