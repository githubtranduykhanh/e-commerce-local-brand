const path = {
    PUBLIC:'/',
    HOME:'',
    ALL:'*',
    LOGIN:'login',
    PRODUCTS:'products',
    BLOGS:'blogs',
    OUR_SERVICES:'services',
    FAQ:'faqs',
    COLLECTIONS:'collections',
    COLLECTIONS__CATEGOGY:'collections/:category',
    COLLECTIONS_DETAIL_PRODUCT__CATEGOGY__PID__TITLE:'collections/:category/:pid/:title',
    FINAL_REGISTER:'final-register/:status',
    RESET_PASSWORD:'reset-password/:resettoken',


    //ADMIN
    ADMIN:'admin',
    DASHBOARD:'dashboard',
    MANAGE_PRODUCT:'manage-product',
    MANAGE_USER:'manage-user',
    MANAGE_ORDER:'manage-order',
    CREATE_PRODUCTS:'create-products',


    //MEMBER
    MEMBER:'member',
    PERSONAL:'personal'
}

export default path