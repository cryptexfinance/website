import React from "react"
import Select from "react-select"
import { COLORS } from "./utils/colors"

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    color: COLORS.GREY_LIGHT,
    backgroundColor: COLORS.BACKGROUND_BOXES,
    borderWidth: 0.8,
    borderRadius: 1,
    borderColor: COLORS.GREY,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: COLORS.GREY_LIGHT,
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    color: COLORS.GREY_LIGHT,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 1,
    backgroundColor: COLORS.BACKGROUND_BOXES,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? COLORS.DARK_CLEAN : COLORS.GREY_LIGHT,
    backgroundColor: state.isSelected
      ? COLORS.SHADOW_PURPLE_NEON
      : COLORS.BACKGROUND_BOXES,
    padding: 10,
    fontFamily: "Helvetica Neue",
  }),
  input: (provided, state) => ({
    ...provided,
    color: COLORS.GREY_LIGHT,
    fontFamily: "Helvetica Neue",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: COLORS.GREY_LIGHT,
    fontFamily: "Helvetica Neue",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: COLORS.GREY_LIGHT,
    fontFamily: "Helvetica Neue",
  }),
}

const SelectCryptex = props => {
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
    />
  )
}

export default SelectCryptex
