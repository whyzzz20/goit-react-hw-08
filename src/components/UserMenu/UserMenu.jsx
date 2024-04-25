import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../redux/auth/operations';
import { selectEmail } from '../../redux/auth/selectors';

import styles from './UserMenu.module.css';

const UserMenu = () => {
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.wrapper}>
      <p>Welcome, {email}</p>
      <button type="button" className={styles.button} onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};
export default UserMenu;
