import React from "react";

const AddButton = (props) => {
  return (
    <button className="btn btn-sm btn-wide btn-primary text-white font-Roboto mt-2 rounded-[20px] md:w-72 md:h-12 lg:w-[432px]">
      {props.title}
    </button>
  );
};

const DeleteButton = (props) => {
  return (
    <button className="btn btn-sm btn-outline btn-wide text-primary shadow-lg font-Roboto mt-2 rounded-[20px] md:h-12 md:w-72 lg:w-[432px]">
      {props.title}
    </button>
  );
};
export { DeleteButton, AddButton };