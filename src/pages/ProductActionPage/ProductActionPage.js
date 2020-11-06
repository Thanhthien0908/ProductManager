import React from 'react';
import { Link } from 'react-router-dom';
import {actAddProductRequest, actGetProductRequest, actUpdateProductRequest} from './../../actions/index';
import {connect} from 'react-redux';
class ProductActionPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            txtName : '',
            txtPrice : '',
            chkbStatus : ''
        };
    }
    componentDidMount(){
        var { match } = this.props;
        if(match){
            var id = match.params.id;
            this.props.onEditProduct(id);
            // callApi(`products/${id}`, 'GET', null).then(res =>{
            //     var data = res.data;
            //     this.setState({
            //         id : data.id,
            //         txtName : data.name,
            //         txtPrice : data.price,
            //         chkbStatus: data.status
            //     })
            // }); 
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            var {itemEditing} = nextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus : itemEditing.status
            })
        }
    }
    onChange = e =>{
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        });
    }
    onSave = e =>{
        e.preventDefault();
        var {id, txtName, txtPrice, chkbStatus } = this.state;
        var {history} = this.props;
        var product ={
            id: id,
            name : txtName,
            price: txtPrice,
            status : chkbStatus
        }
        if(id){ //update
            // HTTP method : PUT
            // callApi(`products/${id}`,'PUT', {
            //     name: txtName,
            //     price: txtPrice,
            //     status : chkbStatus
            // }).then(res =>{
            //     history.goBack();
            // });
            this.props.onUpdateProduct(product);
            history.goBack();
        }else{
            // callApi('products', 'POST', {
            //     name: txtName,
            //     price: txtPrice,
            //     status : chkbStatus
            // }).then(res =>{
            //     history.goBack();
            // });
            this.props.onAddProduct(product);
            history.goBack();
        }   
    }
    render() {
        var {txtName, txtPrice, chkbStatus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên sản phẩm: </label>
                        <input value={txtName} onChange={this.onChange} type="text" className="form-control" name="txtName"/>
                    </div>
                    <div className="form-group">
                        <label>Giá: </label>
                        <input value={txtPrice} onChange={this.onChange} type="number" className="form-control" name="txtPrice"/>
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái: </label>
                        
                        <div className="checkbox">
                            <label>
                                <input value={chkbStatus} onChange={this.onChange} type="checkbox" name="chkbStatus" checked={chkbStatus}/>
                                Còn Hàng
                            </label>
                        </div>
                        
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">Trở Lại</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return {
        itemEditing: state.itemEditing
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {
        onAddProduct : (product) =>{
            dispatch(actAddProductRequest(product));
        },
        onEditProduct : (id) =>{
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct : (product) =>{
            dispatch(actUpdateProductRequest(product));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
