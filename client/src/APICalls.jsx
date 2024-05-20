import React from "react";

function GetBirthdayData(setBirthdays) {
    fetch('http://127.0.0.1:50055/birthdays').then((data) => data.json()).then((metaData) => setBirthdays(metaData));
}

function DeleteBirthdayAndReload(name, setBirthdays) {
    fetch('http://127.0.0.1:50055/birthdays/' + name, {method: 'DELETE'}).then(() => GetBirthdayData(setBirthdays));
}

function AddBirthdayAndReload(name, month, day, setBirthdays) {
    fetch('http://127.0.0.1:50055/birthdays/' + name + '/' + month + '/' + day, {method: 'POST'}).then(() => GetBirthdayData(setBirthdays));
}

export {GetBirthdayData, DeleteBirthdayAndReload, AddBirthdayAndReload as AddBirthday}