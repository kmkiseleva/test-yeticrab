import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { activeAdmin } from "../store/requestsReducer";

const Header = () => {
  const dispatch = useDispatch();
  const { admin } = useSelector((state: RootState) => state.requests);

  const changeHandler = () => {
    if (admin === false) {
      let pass = prompt("Введите пароль");
      pass === "admin" ? dispatch(activeAdmin(true)) : alert("Пароль неверный");
    } else {
      dispatch(activeAdmin(false));
    }
  };

  return (
    <nav>
      <div className="nav-wrapper pink darken-3 px1">
        <div className="logo">Система ведения заявок</div>
        <ul className="headers">
          <li>
            <div className="switch">
              <label>
                Режим администратора
                <input
                  type="checkbox"
                  checked={admin}
                  onChange={changeHandler}
                />
                <span className="lever"></span>
                On
              </label>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
