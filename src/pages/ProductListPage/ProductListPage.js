import React from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { actFetchProductsRequets, actDeleteProductRequest } from './../../actions/index';
// import axios from 'axios';
import callApi from './../../utils/apiCaller';
class ProductListPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products : []
        };
    }
    componentDidMount(){
        //Được gọi sau khi component đc render lần đầu tiên
        // Tránh việc không lấy đc dữ liệu từ server : 
        //khi thời gian lấy dữ liệu từ server mất 5s mà thời gian render component chỉ mất 1s => hiển thị sẽ k có dữ liệu 
        // callApi('products', 'GET', null).then(res =>{
        //     this.props.fetchAllProducts(res.data);
        // })
        this.props.fetchAllProducts();
    }
    
    onDelete = id =>{
        // var {products} = this.state;
        // callApi(`products/${id}`, 'DELETE', null).then(res =>{
        //     if(res.status === 200){
        //         var index = this.findIndex(products, id);
        //         if(index !== -1){
        //             products.splice(index, 1);
        //             this.setState({
        //                 products: products
        //             })
        //         }
                
        //     }
        // })
        this.props.onDeleteProduct(id);
    }
    findIndex = (products, id) =>{
        var result= -1;
        products.forEach((product, index) =>{
            if(product.id === id){
                result = index;
            }
        })
        return result;
    }

    render() {
        //var {products} = this.props;    
        var {products} = this.props;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              
              <Link to="/product/add" type="button" className="btn btn-info mb-10">Thêm sản phẩm</Link>
              <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
    }
    showProducts = products =>{
        var result = null;
        if(products.length > 0){
            result = products.map((product,index) =>{
                return (
                    <ProductItem key={index} product={product} index={index} onDelete = {this.onDelete}/>
                )
            })
        }
        return result;
    }
}

const mapStateToProps = (state) =>{
    return {
        products: state.products
    }
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        fetchAllProducts : () =>{
            dispatch(actFetchProductsRequets());
        },
        onDeleteProduct : (id) =>{
            dispatch(actDeleteProductRequest(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
