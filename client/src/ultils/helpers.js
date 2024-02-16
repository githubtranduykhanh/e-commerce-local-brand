import icons from './icons'
const {FaRegStar,FaStar} = icons

export const createSlug = str => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join('-')
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()
export const randomNumberStar = index => {
    return '-' + Math.round(Math.random() * 1000) + index
}
export const renderStarFromNumber = (number,size) => {
    if(!Number(number)) return
    const stars = []
    for(let i = 0 ; i<+number ; i++) stars.push(<FaStar key={`render-Star-FaStar-${randomNumberStar(i)}`} size={size || 16} color='orange'/>)
    for(let i = 5 ; i>+number ; i--) stars.push(<FaRegStar key={`render-Star-FaRegStar-${randomNumberStar(i)}`} size={size || 16} color='orange' />)
    return stars
}

export const secondsToHms = (d) => {
    d = Number(d) / 1000
    const h = Math.floor(d/3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)
    return ({h,m,s})
}