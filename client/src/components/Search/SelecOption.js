

const SelecOption = ({icon,onClick,type}) => {
    return (  
        <div onClick={(e)=>onClick(e,type)} className="w-10 h-10 bg-white rounded-full border shadow-md flex justify-center items-center hover:bg-gray-800 hover:text-white hover:border-gray-800 cursor-pointer">
            {icon}
        </div>
    );
}

export default SelecOption;