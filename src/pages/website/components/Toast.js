import React from "react";
import { toast } from "react-toastify";
import toasty from "../../../../static/toasty.png";

export const Toast = async (
  title,
  body,
  duration = 3000,
  fn = () => {},
  delay = 0
) => {
  const toastConstant = (
    <div className="body">
      <img src={toasty} alt="toasty" className="toasty" />
      <h5>{title}</h5>
      <p>{body}</p>
    </div>
  );
  if(title==="success"){
    toast.success(toastConstant, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: duration,
      hideProgressBar: true,
      delay,
      onClose: () => {
        fn();
      },
    });
  } else {
    toast.error(toastConstant, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: duration,
      hideProgressBar: true,
      delay,
      onClose: () => {
        fn();
      },
    });
  }
  
};