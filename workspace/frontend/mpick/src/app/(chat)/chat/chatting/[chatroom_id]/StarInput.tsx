import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FaStar, FaStarHalf } from "react-icons/fa";

interface StarInputProps {
  onClickRating: (value: number) => void;
  value: number;
  isHalf: boolean;
}

const Input = styled.input`
  display: none;
`;

interface LabelProps {
  isHalf: boolean;
}

const Label = styled.label<LabelProps>`
  cursor: pointer;
  font-size: 4rem;
  color: lightgray;

  ${({ isHalf }) =>
    isHalf &&
    css`
      position: absolute;
      width: 32px;
      overflow: hidden;

      &:nth-of-type(10) {
        transform: translate(-288px);
      }
      &:nth-of-type(8) {
        transform: translate(-224px);
      }
      &:nth-of-type(6) {
        transform: translate(-160px);
      }
      &:nth-of-type(4) {
        transform: translate(-96px);
      }
      &:nth-of-type(2) {
        transform: translate(-32px);
      }
    `}
`;

const StarInput: React.FC<StarInputProps> = ({ onClickRating, value, isHalf }) => {
  const handleClickRatingInput = () => {
    onClickRating(value);
  };

  return (
    <>
      <Input
        type="radio"
        name="rating"
        id={`star${value}`}
        value={value}
        defaultChecked={value === 3}
      />
      <Label onClick={handleClickRatingInput} isHalf={isHalf} htmlFor={`star${value}`}>
        {isHalf ? <FaStarHalf /> : <FaStar />}
      </Label>
    </>
  );
};

export default StarInput;
