import React, { useState, useEffect } from "react";
import Loading from "./components/LoadingComponent.jsx";
import {GetBirthdayData, DeleteBirthdayAndReload, AddBirthday} from "./APICalls.jsx";
import BirthdayTable from "./components/BirthdayTableComponent.jsx";
import "./styles/Global.css";

function App() {
  const [birthdays, setBirthdays] = useState(null);
  useEffect(() => GetBirthdayData(setBirthdays), []);
  if (!birthdays) return <Loading />;
  return <BirthdayTable birthdays={birthdays} setBirthdays={setBirthdays}/>;
}

export default App;
