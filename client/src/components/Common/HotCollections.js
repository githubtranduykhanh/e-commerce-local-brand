import {HotColletionCart} from '../../components'

const HotColletions = ({categorys}) => {
    return (  
        <div className='flex flex-wrap mt-[15px] ml-[2px] w-full gap-5'>
            {categorys?.filter(el => el.brand.length > 0)?.map(el => (
                <HotColletionCart key={`HotColletions-${el._id}`} category={el}/>
            ))}
        </div>
    );
}

export default HotColletions;