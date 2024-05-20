import React, { useState } from "react";
import styles from "../styles/BirthdayRow.module.css";

function BirthdayRow({ birthday, onDelete }) {
  console.log(birthday);
  console.log(onDelete);
  return (
    <div className={styles.birthday_row}>
      <p>{birthday.name}</p>
      <p>
        {birthday.date.month} / {birthday.date.day}
      </p>
      <div className={styles.button_container}>
        <button
          className={styles.button}
          onClick={() => onDelete(birthday.name)}
        >
          {"\u2715"}
        </button>
      </div>
    </div>
  );
}

function BirthdayRowHeader() {
  return (
    <div className={styles.birthday_row}>
      <p>Name</p>
      <p>Date</p>
      <p></p>
    </div>
  );
}

function AddRow({ onAdd }) {
  const [adding, setAdding] = useState(false);
  if (adding) return <EmptyRow onAdd={onAdd} setAdding={setAdding} />;
  return (
    <div className={styles.birthday_row}>
      <p></p>
      <div className={styles.button_container}>
        <button className={styles.button} onClick={() => setAdding(true)}>
          {"\uFF0B"}
        </button>
      </div>
      <p></p>
    </div>
  );
}

function EmptyRow({ onAdd, setAdding }) {
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  function handleDayInput(e) {
    setDay(e.target.value);
  }
  function handleMonthInput(e) {
    setMonth(e.target.value);
  }
  function handleNameInput(e) {
    setName(e.target.value);
    console.log(name, month, day);
  }

  function handleSubmit() {
    if (name === "") {
      alert("Name must not be empty");
      return;
    }
    if (month < 1 || month > 12) {
      alert("Month must be between 1 and 12");
      return;
    }
    if (day < 1 || day > 31 ) {
      alert("Day must be between 1 and 31");
      return;
    }

    onAdd(name, month, day);
    setAdding(false);
  }

  function handleCancel() {
    setAdding(false);
  }

  return (
    <div className={styles.birthday_row}>
      <input
        className={styles.input_container}
        type="text"
        placeholder="Name"
        id="name"
        value={name}
        onChange={handleNameInput}
      ></input>
      <div className={styles.input_container}>
        <input
          className={styles.date_input}
          type="text"
          placeholder="month"
          id="month"
          value={month}
          onChange={handleMonthInput}
        ></input>
        /
        <input
          className={styles.date_input}
          type="text"
          placeholder="Day"
          id="day"
          value={day}
          onChange={handleDayInput}
        ></input>
      </div>
      <div className={styles.button_container}>
        <button className={styles.button} onClick={handleSubmit}>{"\u2713"}</button>
        <button className={styles.button} onClick={handleCancel}>{"\u2715"}</button>
      </div>
    </div>
  );
}

export { BirthdayRowHeader, BirthdayRow, AddRow };
