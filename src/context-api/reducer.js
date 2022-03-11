export const initialState={
    shoppingCart:[],
    user:null

}
export const getCartTotal = (shoppingCart) =>
    shoppingCart?.reduce((amount,item)=>amount+item.price ,0)



const reducer=(state,action)=>{
    switch (action.type){
        case "ADD_TO_CART":
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.item]
            }
        case "REMOVE_FROM_CART":
            const index = state.shoppingCart.findIndex(
                (shoppingCartItem)=> shoppingCartItem.id === action.id
            )
            let newShoppingCart =[...state.shoppingCart]
            if(index>=0){
                newShoppingCart.splice(index,1)
            }
            else{
                console.warn(`Cant remove product (id:${action.id} as it is not in cart!`)
            }
            return {
                ...state,
                shoppingCart: newShoppingCart
            }

        case "SET_USER":
            return {
                ...state,
                user:action.user
            }
        default:
            return state;
    }
}

export default reducer;