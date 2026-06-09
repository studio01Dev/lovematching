import { useEffect, useState } from 'react';
import '../input/input.css';
import { district, subdistrict } from '../../../domain/models/area';

function AreaCheckboxItem({ id, label, checked, onChange, inputRef }) {
  return (
    <div className="input-container halign gap4 calign">
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="h6 r">
        {label}
      </label>
    </div>
  );
}

export default function InputAreaCheckbox({
  labelText1,
  labelText2,
  dataToForm,
  inputRef,
  defaultValue,
  namePrefix = 'area',
}) {
  const [districtSelect, setDistrictSelect] = useState(defaultValue?.[0] || '');
  const [subdistrictSelect, setSubdistrictSelect] = useState(defaultValue?.[1] || '');

  useEffect(() => {
    if (defaultValue?.[0]) {
      setDistrictSelect(defaultValue[0]);
    }
    if (defaultValue?.[1]) {
      setSubdistrictSelect(defaultValue[1]);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (districtSelect && subdistrictSelect) {
      dataToForm([districtSelect, subdistrictSelect]);
    } else {
      dataToForm([]);
    }
  }, [districtSelect, subdistrictSelect]);

  const handleDistrictChange = (value) => {
    setDistrictSelect((prev) => (prev === value ? '' : value));
    setSubdistrictSelect('');
  };

  const handleSubdistrictChange = (value) => {
    setSubdistrictSelect((prev) => (prev === value ? '' : value));
  };

  const subdistrictOptions = subdistrict[districtSelect] || [];

  return (
    <div className="input-comp">
      <div className="valign gap12">
        <div className="h6 m grey500">{labelText1}</div>
        <div className="input">
          <div className="checkbox-container">
            {district.map((item, index) => {
              const id = `${namePrefix}-district-${index}`;
              return (
                <AreaCheckboxItem
                  key={item}
                  id={id}
                  label={item}
                  inputRef={index === 0 ? inputRef : undefined}
                  checked={districtSelect === item}
                  onChange={() => handleDistrictChange(item)}
                />
              );
            })}
          </div>
        </div>

        {districtSelect && (
          <>
            <div className="h6 m grey500">{labelText2}</div>
            <div className="input">
              <div className="checkbox-container">
                {subdistrictOptions.map((item, index) => {
                  const id = `${namePrefix}-subdistrict-${index}`;
                  return (
                    <AreaCheckboxItem
                      key={item}
                      id={id}
                      label={item}
                      checked={subdistrictSelect === item}
                      onChange={() => handleSubdistrictChange(item)}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
