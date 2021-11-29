import React from "react";
import btnTemStyle from "./BtnTemperamentos.module.css";

function BtnTemperamentos({ temperamento, eliminar }) {
  return (
    <button
      name='BtnDelete'
      value={temperamento}
      className={btnTemStyle.btn}
      onClick={(e) => {
        e.preventDefault();
        eliminar(e);
      }}
    >
      <div className={btnTemStyle.svgWrapper1} value={temperamento}>
        <div className={btnTemStyle.svgWrapper}>
          <svg
            value={temperamento}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            width='24'
            height='24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </div>
      </div>
      {temperamento}
    </button>
  );
}

export default BtnTemperamentos;
