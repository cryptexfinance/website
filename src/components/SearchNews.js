import React, { useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import SelectCryptex from "./Select"
import SearchInput from "./SearchInput"


const SearchNews = ({
  blogKeys,
  setFilteredBlogKeys,
  tagList,
  setPostsCount,
}) => {
  const keysDivider = "+++"
  const dbDefaultTitle = "Filter"
  const { t } = useTranslation()
  const [searchCriteria, setSearchCriteria] = useState("")
  const [selectedTag, setSelectedTag] = useState(dbDefaultTitle)

  const filterPosts = (criteria, filterTag) => {
    setPostsCount(9)
    let filterKeys = []
    if (filterTag === dbDefaultTitle && criteria !== "")
      filterKeys = blogKeys.filter(key => key.includes(criteria.toLowerCase()))
    else if (criteria === "" && filterTag !== dbDefaultTitle)
      filterKeys = blogKeys.filter(key =>
        key.includes(
          [keysDivider, filterTag.toLowerCase(), keysDivider].join("")
        )
      )
    else if (criteria !== "" && filterTag !== dbDefaultTitle) {
      const tagF = [keysDivider, filterTag.toLowerCase(), keysDivider].join("")
      filterKeys = blogKeys.filter(
        key => key.includes(tagF) && key.includes(criteria.toLowerCase())
      )
    } else {
      filterKeys = blogKeys
    }
    setFilteredBlogKeys(filterKeys)
  }

  const onChange = criteria => {
    setSearchCriteria(criteria)
    filterPosts(criteria, selectedTag)
  }

  const onSelectChange = (inputValue, { action }) => {
    if (action === "clear") {
      setSelectedTag(dbDefaultTitle)
      filterPosts(searchCriteria, dbDefaultTitle)
    } else {
      setSelectedTag(inputValue.value)
      filterPosts(searchCriteria, inputValue.value)
    }
  }

  return (
    <div className="filter-box">
      <SelectCryptex
        isClearable={true}
        isMulti={false}
        isSearchable={true}
        options={tagList}
        placeholder={t('filter')}
        onSelectChange={onSelectChange}
      />
      <SearchInput
        placeholder={t('search')}
        value={searchCriteria}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchNews
