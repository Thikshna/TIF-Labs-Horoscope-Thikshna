import "./FormInput.css";
import React, { useEffect, useState } from "react";
import zodiacSigns from "../zodiacSigns";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHoroscope,
  HoroscopeActions,
  updateReducer,
} from "../Redux/Actions/HoroscopeActions";
import Loader from "./Loader";

function FormInput() {
  useEffect(() => {
    const localHoroscopeData = localStorage.getItem("Horoscope_Data");
    const UserData = localStorage.getItem("User_Data");
   
    if (localHoroscopeData) {
      let FormUserData = JSON.parse(UserData);
      setFormData(FormUserData);
      dispatch(updateReducer(FormUserData, JSON.parse(localHoroscopeData)));
    }
  }, []);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.HoroscopeReducer.userData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zodiacsign: "",
    day: "",
  });

  const [helpertext, setHelperText] = useState({});
  const validate = (formData) => {
    const valobj = { name: "", email: "", zodiacsign: "", day: "" };
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (formData.name === "") {
      valobj.name = " Please Enter Name";
    }

    if (formData.email === "") {
      valobj.email = "Enter your email addess ";
    } else if (!regex.test(formData.email)) {
      valobj.email = "Enter a valid email address";
    }
    if (formData.zodiacsign === "") {
      valobj.zodiacsign = "Select a Zodiac sign";
    }
    if (formData.day === "") {
      valobj.day = "Select a day";
    }

    setHelperText(valobj);
    let valLength = Object.values(valobj).filter((item) => {
      return item === "";
    }).length;
    if (valLength === 4) {
      dispatch(HoroscopeActions(formData));
      dispatch(fetchHoroscope(formData.zodiacsign, formData.day));
    }
  };

  const collectFormDetails = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const displayHoroscope = useSelector(
    (state) => state.HoroscopeReducer.userHoroscope
  );
  const isLoading = useSelector((state) => state.HoroscopeReducer.loading);

  const checkDate = (date) => {
    let isCurrent = false;
    if (date) {
      const strfrom = new Date(displayHoroscope.date_range.split("-")[0]);
      const strto = new Date(displayHoroscope.date_range.split("-")[1]);
      const strtoday = new Date();
      let fromarr = Array.of(
        strfrom.getDate(),
        strfrom.getMonth(),
        strtoday.getFullYear()
      );
      let toarr = Array.of(
        strto.getDate(),
        strto.getMonth(),
        strtoday.getFullYear()
      );
      let todayarr = Array.of(
        strtoday.getDate(),
        strtoday.getMonth(),
        strtoday.getFullYear()
      );
      const from = new Date(fromarr[2], parseInt(fromarr[1]) - 1, fromarr[0]);
      const to = new Date(toarr[2], parseInt(toarr[1]) - 1, toarr[0]);
      const today = new Date(
        todayarr[2],
        parseInt(todayarr[1]) - 1,
        todayarr[0]
      );
      if (today > from && today < to) {
        isCurrent = true;
      }
    }
    return isCurrent;
  };

  return (
    <div className="mainwrapper">
      <div className="formwrapper p-fluid">
        <div className="p-field">
          <label>Name : </label>
          <InputText
            value={formData.name}
            onChange={collectFormDetails}
            name="name"
            type="text"
          />
          <span className="asterisk">{helpertext.name}</span>
        </div>
        <hr />
        <div className="p-field">
          <label>Email : </label>
          <InputText
            value={formData.email}
            onChange={collectFormDetails}
            name="email"
            type="email"
          />
          <span className="asterisk">{helpertext.email}</span>
        </div>
        <hr />
        <div className="p-field ">
          <label>Zodiac sign : </label>
          <Dropdown
            className="drop p-fluid"
            options={zodiacSigns}
            value={formData.zodiacsign}
            name="zodiacsign"
            onChange={collectFormDetails}
          ></Dropdown>
          <span className="asterisk">{helpertext.zodiacsign}</span>
        </div>
        <hr />
        <div className="p-field">
          <label>Pick a Date :</label>
          <br />

          <div className="radiogroup">
          <div>
            <RadioButton
              checked={formData.day === "Yesterday"}
              onChange={collectFormDetails}
              type="radio"
              name="day"
              value="Yesterday"
            />
            <label> Yesterday</label>
          </div>

          <div>
            <RadioButton
              checked={formData.day === "Today"}
              onChange={collectFormDetails}
              type="radio"
              name="day"
              value="Today"
            />
            <label> Today</label>
          </div>

          <div>
            <RadioButton
              checked={formData.day === "Tomorrow"}
              onChange={collectFormDetails}
              type="radio"
              name="day"
              value="Tomorrow"
            />
            <label> Tomorrow</label>
          </div>

          </div>
          <span className="asterisk">{helpertext.day}</span>
        </div>
        <hr />
        <Button
          label="Get Horoscope"
          onClick={() => {
            validate(formData);
          }}
        />
      </div>
      <div className="horoscopeDisplay">
        <Card
          className={`dataCard ${
            checkDate(displayHoroscope.date_range) && "today"
          }`}
        >
          {isLoading ? (
            <Loader />
          ) : userData.length === 0 ? (
            <p>
              Please Fill Up the Form and Click on Submit Get Hooscope Button
            </p>
          ) : (
            <>
              {checkDate(displayHoroscope.date_range) && (
                <h2>
                  <u>Todays date falls within the Horoscope Date range</u>
                </h2>
              )}
              <p className="displaydate">
                Date : {displayHoroscope.current_date}
              </p>
              <p>Hello {userData.name} ,</p>

              <p>Zodiac Sign : {userData.zodiacsign}</p>
              <p>Date range : {displayHoroscope.date_range}</p>
              <p>Color : {displayHoroscope.color}</p>
              <p>Lucky Number : {displayHoroscope.lucky_number}</p>
              <p>Lucky Time : {displayHoroscope.lucky_time}</p>
              <p>compatibility : {displayHoroscope.compatibility}</p>
              <p>Mood : {displayHoroscope.mood}</p>
              <p>Discription : {displayHoroscope.description}</p>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
export default FormInput;
