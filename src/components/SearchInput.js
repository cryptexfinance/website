import React from "react"
import Form from "react-bootstrap/esm/Form"
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"


const SearchInput = ({
  placeholder,
  value,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
}) => {
  return (
    <div className="search-box">
      <FaSearch className="search-icon" />
      <Form.Control
        id="search-input"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default SearchInput
