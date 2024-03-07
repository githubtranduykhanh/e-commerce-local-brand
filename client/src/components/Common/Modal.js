import icons from "../../ultils/icons";
import { memo } from "react";
const { IoMdClose } = icons

const Modal = ({children,className,onCloseModal,iconCloseColer,iconCloseSize}) => {
    return ( 
        <div className="modal">
            <div className={`modal-content ${className}`}>
                <IoMdClose color={iconCloseColer} size={iconCloseSize} className="close" onClick={onCloseModal}></IoMdClose>
                {children}
            </div>
        </div>
     );
}
 
export default memo(Modal);