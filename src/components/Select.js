import React from 'react';
import Select from 'react-select';
import { COLORS } from "./utils/colors";


const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    color: COLORS.GREY,
    backgroundColor: COLORS.BACKGROUND_BOXES,
    borderWidth: 0.8,
    borderRadius: 1,
    borderColor: COLORS.GREY,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: COLORS.GREY,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    color: COLORS.GREY,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 1,
    backgroundColor: COLORS.BACKGROUND_BOXES,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? COLORS.DARK_CLEAN : COLORS.GREY,
    backgroundColor: state.isSelected ? COLORS.SHADOW_PURPLE_NEON : COLORS.BACKGROUND_BOXES,
    padding: 10,
    fontFamily: "Space Mono"
  }),
  input: (provided, state) => ({
    ...provided,
    color: COLORS.GREY,
    fontFamily: "Space Mono"
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: COLORS.GREY,
    fontFamily: "Space Mono"
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: COLORS.GREY,
    fontFamily: "Space Mono"
  }),
}


const SelectCryptex = (props) => {
  return (
    <Select
        className="select-cryptex"
        classNamePrefix="select-cryptex"
        isClearable={props.isClearable}
        isMulti={props.isMulti}
        isSearchable={props.isSearchable}
        placeholder={props.placeholder}
        options={props.options}
        onChange={props.onSelectChange}
        styles={customStyles}
    />)
}


export default SelectCryptex;