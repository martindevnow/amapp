import React from "react";
import styled from "styled-components";

import themeGet from "../../styles/themeGet";

const Label = styled.label`
  // Tweak these to change the style of the toggle
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  /* Hide default HTML checkbox */
  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + & {
    background-color: ${themeGet("colors", "primary")};
  }

  input:focus + & {
    box-shadow: 0 0 1px ${themeGet("colors", "primary")};
  }

  input:checked + &:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const RoundSlider = styled(Slider)`
  border-radius: 34px;
  :before {
    border-radius: 50%;
  }
`;

type ToggleProps = {
  checked?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Toggle: React.FC<ToggleProps> = ({ className, checked, onChange }) => {
  return (
    <Label className={className}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <RoundSlider />
    </Label>
  );
};

export default Toggle;
