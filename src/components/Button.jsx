import React from "react";
import { StyledButton } from "./Button.style";
import Spinner from '../../../public/assets/Images/spinners.gif';
import Image from "next/image";

const Button = ({ children, loading, onClick, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {
        loading ? <Image
        src={Spinner} 
        alt="Spinner" 
        object-fit= "contain" /> :  children
      }
    </button>
  );
};



export default Button;