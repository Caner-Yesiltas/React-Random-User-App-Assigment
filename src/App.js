import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [users, setUsers] = useState([]);

  const [person, setPerson] = useState({});
  const [title, setTitle] = useState("name");
  const [userValue, setUserValue] = useState("");

  const nextUser = async () => {
    const res = await axios.get(url);
    console.log(res.data);
    const user = res.data.results[0];
    setPerson(user); //person degiskenini yeni aldigimiz apiden gelen degerin icine koyduk user objesi person degiskenin ici olmus oldu state yapisi ile
    setTitle("My name is");
    setUserValue(`${user.name.first} ${user.name.last}`);
  };

  useEffect(() => {
    nextUser();
  }, []);

  const handleAddUser = () => {
    setUsers((prevUsers) => [...prevUsers, person]);
  };

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={person.picture?.large}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">{title} is</p>
          <p className="user-value">{userValue}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={nextUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleAddUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="body-tr">
                  <td>{user.name.first}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dob.age}</td>
                  <td>{user.name.first}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
