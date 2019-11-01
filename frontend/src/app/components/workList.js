import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        listWork: state.listWorkReducer.listWork,
    } 
  }

const mapDispatchToProps = (dispatch) => {
    return {
        handleSidePanel: () => dispatch({ type: 'SWITCH_PANEL' }),
    }
}

class ListWork extends Component{
    updateWork = () => {

    }
    render(){
        return (
        this.props.listWork.map((el,key) => 
            <tr key ={el.id} id={el.id}>
                <th scope="row">{key + 1}</th>
                <td>{el.name}</td>
                <td>
                {(el.status === "show") ? 
                    <span className="badge badge-primary">
                        Đang hoạt động 
                    </span> : 
                    <span className="badge badge-secondary">
                        Chưa hoạt động 
                    </span>}
                </td>
                <td className="d-flex justify-content-center"> 
                    <button type="submit" className="btn btn-secondary btn-sm mr-2" onClick={this.deleteWork}><i className="fas fa-trash-alt"></i>&nbsp;&nbsp;Xóa</button> 
                    <button type="submit" className="btn btn-dark btn-sm" onClick={this.props.handleSidePanel}><i className="fas fa-edit"></i>&nbsp;&nbsp;Sửa</button> 
                </td>
            </tr>
        ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWork);