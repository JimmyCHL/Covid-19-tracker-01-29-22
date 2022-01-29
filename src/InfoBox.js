import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const InfoBox = ({ title, cases, total, isred, active, ...props }) => {
  return (
    <CardContainer onClick={props.onClick} active={active} isred={isred}>
      <CardContent>
        <TitleTypography color="textSecondary">{title}</TitleTypography>
        <Cases isred={isred}>{cases}</Cases>
        <TotalTypography color="textSecondary">{total} Total</TotalTypography>
      </CardContent>
    </CardContainer>
  );
};

export default InfoBox;

const CardContainer = styled(Card)`
  flex: 1;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  transition: all 0.2s ease-in-out;
  :not(:last-child) {
    margin-right: 10px;
  }

  ${(props) => {
    if (props.isred && props.active) {
      return "border-top: 10px solid red;";
    } else if (props.active) {
      return "border-top: 10px solid greenyellow";
    }
  }}
`;

const TitleTypography = styled(Typography)``;

const Cases = styled("h2")`
  color: #cc1034;
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;

  ${(props) => !props.isred && "color:lightgreen"}
`;

const TotalTypography = styled(Typography)`
  color: #6c757d;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  margin-top: 15px !important;
`;
