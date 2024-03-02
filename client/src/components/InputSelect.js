import { memo } from "react";


const InputSelect = ({listSelect,onChangeSelect}) => {
    console.log('InputSelect')
    return ( 
        <select onChange={onChangeSelect} className="form-select text-[#1a1b18] text-[12px] w-[15rem] leading-[29px]">
            {listSelect && listSelect?.map(el =>(
                <option key={`InputSelect-listSelect-${el?.title}`} value={el?.value}>{el?.title}</option>
            ))}
        </select>
    );
}
 
export default memo(InputSelect);