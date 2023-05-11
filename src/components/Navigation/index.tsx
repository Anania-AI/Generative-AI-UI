import React from 'react';

export default function Navigation(props) {
  const { items } = props;

  return (
    <div className="flex justify-center gap-[10px]">
      {
        items.map((item, index) => (
          <div key={index}>
            <a href={item.link} target="_blank" className="w-[150px] h-[40px] flex justify-center items-center text-[#2E2E2E] font-bold bg-[#FFE774] rounded-lg hover:bg-slate-100 transition-all duration-300">{item.text}</a>
          </div>
        ))
      }
    </div>
  )
}