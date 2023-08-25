import { 
  FC,
} from 'react';
import 
  Select,
  { components }
from 'react-select';
import variants from '../styles/_variables.scss';

interface FilterProps {
  className?: string;
  options?: object;
  value?: any;
  onChange?: any;
}

const filterStyle = {
  control: styles => ({ 
    ...styles,
    backgroundColor: 'white',
    minHeight: 65,
    marginBottom: 45,
    borderRadius: 5,
    border: 'none',
    boxShadow: '0px 20px 21px #d4e9ec'
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '10px 30px'
  }),
  multiValue: (styles) => ({
    ...styles,
    color: variants.green,
    backgroundColor: variants.backgroundColor,
    margin: '0 7px'
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: variants.green,
    fontSize: 14,
    fontWeight: 'bold',
    padding: '10px 10px',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: '#fff',
    backgroundColor: variants.green,
    padding: '5px 10px',
    
    ':hover': {
      backgroundColor: '#000000',
      color: 'white',
      cursor: 'pointer'
    },
    
  }),
};

const ClearIndicator = props => {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <a className="btn-clear">Clear</a>
    </div>
  );
};


const Filter: FC<FilterProps> = ({ 
  options, 
  className, 
  ...rest 
}) => {
  return (
    <Select
      isMulti
      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null, ClearIndicator }}
      isSearchable={false}
      styles={{ ...filterStyle }}
      options={options}
      className={className}
      {...rest}
    />
  );
}

export default Filter;
