import React from 'react';
import getString from "@/utils/getString";

export default function Query(props) {
  const { onSendQuery } = props;
  const [query, setQuery] = React.useState('');

  return (
    <div className="flex flex-col items-center w-full h-[300px] bg-[#FFFFFF] pt-14 rounded-[20px] p-5 px-10">
      <h2 className="font-bold text-[24px] text-center text-[#2E2E2E]">{getString("headline2")}</h2>
      <input type="text" placeholder={getString('inputPlaceHolder')} value={query} onChange={e => setQuery(e.target.value)} className="w-full outline-none h-10 rounded-[25px] border border-[#D9D9D9] text-black bg-white px-3 mt-8"/>
      <button onClick={() => onSendQuery(query)} className="w-[150px] h-[40px] mt-8 flex justify-center items-center text-white font-bold bg-[#1AA7EC] rounded-[20px] hover:bg-[#1294d3] transition-all duration-300">{getString('buttonText')}</button>
    </div>
  )
}

