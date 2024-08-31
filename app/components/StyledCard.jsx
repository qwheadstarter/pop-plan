import React from "react";
import { Card } from "@mui/material";

const StyledCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  margin: 50px auto;
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .MuiCardContent-root {
    padding: 25px;
    background: #ecedf7;
    color: #222;
    position: relative;
    border-radius: 8px;
    z-index: 1;
    width: 100%;
    margin: 5px;
    overflow: hidden;
  }

  ::before {
    content: "";
    display: block;
    background: linear-gradient(
      90deg,
      hsla(197, 100%, 64%, 1) 0%,
      hsla(339, 100%, 55%, 1) 100%
    );
    height: 500px;
    width: 500px;
    position: absolute;
    animation: rotate 8s linear infinite;
    z-index: 0;
  }

  @keyframes rotate {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export default StyledCard;
