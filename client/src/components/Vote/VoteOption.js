import { memo, useState } from "react";
import logo from'../../assets/logo.png'
import { voteOptions } from "../../ultils/contants";
import { FaStar } from "react-icons/fa";

const VoteOption = ({productVote,handleVoteOption}) => {
    const [chosenScore,setChosenScore] = useState(0)
    const [textarea,setTextarea] = useState('')
    const resetFrom = async (Handle) => {
        const isHandle = await Handle(textarea,chosenScore,productVote?._id)
        if(isHandle){
            setChosenScore(0)
            setTextarea('')
        }
    }
    return ( <div className="p-[50px] bg-white shadow-2xl flex flex-col items-center gap-4">
        <img src={logo} alt="logo" className="w-[50%] object-contain"/>
        <h2 className="text-center font-bold tracking-[4px]">{productVote?.title}</h2>
        <textarea value={textarea} onChange={e=>setTextarea(e.target.value)} placeholder="Comments for the product" className="text-sm w-full" rows={3} cols={10}/>
        <span>How do you live this product ?</span>
        <div className="flex justify-center items-center gap-3">
            {voteOptions.map(el => (
                <div onClick={()=>setChosenScore(prve => +prve === el.id ? 0 : el.id)} 
                    className="p-3 flex flex-col  items-center cursor-pointer gap-1 w-[80px] bg-slate-200 hover:bg-slate-400 rounded" key={`VoteOption-voteOptions-${el.text}`}>
                    {Number(chosenScore) && chosenScore >= el.id ? <FaStar color="orange"/> :<FaStar color="gray" />}
                    <span className="text-xs">{el.text}</span>
                </div>
            ))}
        </div>
        <button
            onClick={()=>resetFrom(handleVoteOption)}        
            className=" z-10 button p-4 border rounded-[10px] w-full"
        >Send now</button> 
    </div> );
}
 
export default memo(VoteOption);