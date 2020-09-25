import React from "react";
import { IconComponent } from "./icon.component";

const AddIcon: IconComponent = ({ className, fill }) => {
  return (
    <svg
      className={className}
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 44 44"
    >
      <path
        fill={fill || "black"}
        d="M22,44c-3.309,0-6-2.665-6-5.941V28H5.941C2.665,28,0,25.309,0,22s2.665-6,5.941-6H16V5.941C16,2.665,18.691,0,22,0
	s6,2.665,6,5.941V16h10.059C41.335,16,44,18.691,44,22s-2.665,6-5.941,6H28v10.059C28,41.335,25.309,44,22,44z M5.941,18
	C3.805,18,2,19.832,2,22s1.805,4,3.941,4H18v12.059C18,40.195,19.832,42,22,42s4-1.805,4-3.941V26h12.059C40.195,26,42,24.168,42,22
	s-1.805-4-3.941-4H26V5.941C26,3.805,24.168,2,22,2s-4,1.805-4,3.941V18H5.941z"
      />
    </svg>
  );
};

export default AddIcon;
