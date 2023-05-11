import React from 'react';

export default function Output(props) {
  const { children } = props;

  return (
    <div className="flex flex-col gap-6 items-center w-full bg-[#FFFFFF] rounded-xl">
      {children}
    </div>
  )
}