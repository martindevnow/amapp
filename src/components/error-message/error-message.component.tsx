import React, { FunctionComponent } from "react";

interface ErrorProps {
  error: any;
}
const Error: FunctionComponent<ErrorProps> = ({ error }) => {
  return <pre>{JSON.stringify(error)}</pre>;
};

export default Error;
