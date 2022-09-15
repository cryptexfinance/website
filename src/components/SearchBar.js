import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import SelectCryptex from "./Select";

export const SearchBar = () => {
  const [criteria, setCriteria] = useState("");

  const handleOnChange = (event) => {
    console.log(event.target.value);
    setCriteria(event.target.value);
  };

  const onSelectChange = (inputValue, { action }) => {
    console.log(inputValue.value);
  };

  const catergoryList = [
    { value: "crypto", label: "Crypto" },
    { value: "tcap", label: "TCAP" },
    { value: "ctx", label: "CTX" },
  ]

  return (
    <div className="searchbar">
      <SelectCryptex
        isClearable={true}
        isMulti={false}
        isSearchable={true}
        options={catergoryList}
        placeholder="Categories"
        onSelectChange={onSelectChange}
      />
      <SearchInput
        placeholder="Search..."
        value={criteria}
        onChange={handleOnChange}
      />
    </div>    
  )
};
