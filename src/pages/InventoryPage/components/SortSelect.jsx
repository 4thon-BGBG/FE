import { useEffect, useState } from 'react';
import Select from 'react-select';
const sortOptions = [
  { value: '등록순', label: '등록순' },
  { value: '이름순', label: '이름순' },
  { value: '재고순', label: '재고순' },
];

const customStyles = {
  control: (base) => ({
    // 맨위 컨트롤러 스타일
    ...base,
    borderRadius: '7px',
    border: 'none',
    backgroundColor: '#F5F5F5',
    padding: '0px 2px 0px 24px',
    boxShadow: 'none',
    transition: 'all 0.3s ease',
    filter: 'brightness(1)',
    '&:hover': {
      filter: 'brightness(0.9)',
    },
  }),
  singleValue: (base) => ({
    // 맨위(선택된) 옵션의 스타일
    ...base,
    color: 'black',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    padding: 0,
  }),
  menu: (base) => ({
    // 옵션 컨테이너의 스타일
    ...base,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    borderRadius: '7px',
    boxShadow: 'none',
    margin: 0,
  }),
  option: (base, state) => ({
    // 옵션 하나하나의 스타일
    ...base,
    textAlign: 'end',
    backgroundColor: '#F5F5F5',
    color: state.isSelected ? '#F56E00' : 'black',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: '6.5px 12px 6.5px 0px',
    filter: 'brightness(1)',
    '&:hover': {
      filter: 'brightness(0.9)',
    },
    '&::before': {
      content: '" "',
      display: 'inline-block',
      marginRight: state.isSelected ? '8px' : '14.5px',
      marginBottom: state.isSelected ? '0px' : '3px',
      width: state.isSelected ? '13px' : '4px',
      height: state.isSelected ? '13px' : '4px',
      backgroundColor: state.isSelected ? 'transparent' : '#d9d9d9',
      borderRadius: '10px',
      backgroundImage: `url(/src/assets/select-check.svg)`,
    },
  }),
  dropdownIndicator: (base) => ({
    // 드롭다운 화살표 스타일
    ...base,
    position: 'absolute',
    left: '0',
    color: 'black',
  }),
};

export const SortSelect = ({ setSelected }) => {
  const [selectedOption, setSelectedOption] = useState({});

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setSelected(selectedOption.value);
  }, [setSelected, selectedOption]);

  return (
    <Select
      defaultValue={sortOptions[0]}
      name="정렬"
      options={sortOptions}
      onChange={handleChange}
      styles={customStyles}
      components={{ IndicatorSeparator: () => null }}
      isSearchable={false}
    />
  );
};
