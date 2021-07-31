import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";


const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const[error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter valid name and age (non-empty value).'
      });
      return;
    }
    if (+enteredAge < 1 || +enteredAge > 120 ) {
      setError({
        title: 'Invalid age',
        message: 'Please enter valid age. Probably 1 to 120'
      });
      return;
    }
    
    props.onAddUser(enteredUsername,enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} /> }
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="username"
          value={enteredUsername}
          onChange={usernameChangeHandler}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={enteredAge}
          onChange={ageChangeHandler}
        />
        <Button type="submit">Add user</Button>
      </form>
    
    </Card>
    </div> 
  );
};

export default AddUser;
