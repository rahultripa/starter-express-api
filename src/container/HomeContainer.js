import Home from '../components/Home'
import {connect} from 'react-redux'
import {addToCart,subToCart} from '../state/action-creator/actions'

const mapStateToProps=state=>({
     data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    subToCartHandler:data=>dispatch(subToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
// export default Home;