import React from "react";
import { GetBirthdayData, DeleteBirthdayAndReload, AddBirthday} from "../APICalls";
import { BirthdayRow, BirthdayRowHeader, AddRow} from "./BirthdayRowComponent";

function BirthdayTable({ birthdays, setBirthdays }) {
  const birthdayRows = birthdays.map((b) => (
    <li>
      <BirthdayRow
        birthday={b}
        onDelete={(name) => DeleteBirthdayAndReload(name, setBirthdays)}
      />
    </li>
  ));

  return (
    <ul>
      <BirthdayRowHeader />
      <AddRow onAdd={(name, month, date) => AddBirthday(name, month, date, setBirthdays)} />
      {birthdayRows}
    </ul>
  );
}

export default BirthdayTable;
