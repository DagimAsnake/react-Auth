import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const history = useHistory()

  const authCtx = useContext(AuthContext)

  const newPasswordInputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBwtn-EIqL3uS5XUVTo0WAAoHrWuXZxtFM', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {

      if (res.ok) {
        // return res.json()
        history.replace('/')
      } else {
        return res.json().then(data => {
          let errorMessage = 'Changing password Faild!'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        })
      }
    }).catch(err => {

      alert(err.message)

    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
