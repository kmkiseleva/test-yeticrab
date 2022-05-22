import { useState } from "react";
import { FC } from "react";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { TRequest } from "../store/requestsReducer";
import { editFormRequest, deleteRequest } from "../store/requestsReducer";

type PropTypes = {
  item: TRequest;
};

const Request: FC<PropTypes> = ({ item }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state: RootState) => state.requests);
  const [visible, setVisible] = useState(false);

  const [clientCompanyName, setClientCompanyName] = useState(
    item.clientCompanyName
  );
  const [driverInitials, setDriverInitials] = useState(item.driverInitials);
  const [driverPhone, setDriverPhone] = useState(item.driverPhone);
  const [comments, setComments] = useState(item.comments);

  const onEditHandler = (e: any): void => {
    e.preventDefault();
    dispatch(
      editFormRequest({
        id: item.id,
        orderDate: item.orderDate,
        clientCompanyName,
        driverInitials,
        driverPhone,
        comments,
        atiCode: item.atiCode,
      })
    );
    setVisible(false);
  };

  return (
    <>
      {visible && admin && (
        <tr className="edit__row">
          <td>{item.id}</td>
          <td>{item.orderDate}</td>
          <td>
            <input
              onChange={(e) => setClientCompanyName(e.target.value)}
              value={clientCompanyName}
              type="text"
              id="clientCompanyName"
            />
          </td>
          <td>
            <input
              onChange={(e) => setDriverInitials(e.target.value)}
              value={driverInitials}
              type="text"
              id="driverInitials"
            />
          </td>
          <td>
            <input
              onChange={(e) => setDriverPhone(e.target.value)}
              value={driverPhone}
              type="text"
              id="driverPhone"
            />
          </td>
          <td>
            <input
              onChange={(e) => setComments(e.target.value)}
              value={comments}
              type="text"
              id="comments"
            />
          </td>
          <td>{item.atiCode}</td>
          <td>
            <button
              className="btn waves-effect waves-light indigo right"
              type="submit"
              onClick={(e) => onEditHandler(e)}
            >
              Сохранить изменения
              <i className="material-icons right">send</i>
            </button>
          </td>
        </tr>
      )}

      <tr>
        <td>{item.id}</td>
        <td>{item.orderDate}</td>
        <td>{item.clientCompanyName}</td>
        <td>{item.driverInitials}</td>
        <td>{item.driverPhone}</td>
        <td>{item.comments}</td>
        <td>
          <a
            href={`https://ati.su/firms/${item.atiCode}/info`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.atiCode}
          </a>
        </td>

        {admin && (
          <td>
            <div className="icons">
              <button type="button" onClick={() => setVisible(!visible)}>
                <i className="small material-icons">edit</i>
              </button>
              <button
                type="button"
                onClick={() => dispatch(deleteRequest(item.id))}
              >
                <i className="small material-icons">delete_forever</i>
              </button>
            </div>
          </td>
        )}
      </tr>
    </>
  );
};

export default Request;
