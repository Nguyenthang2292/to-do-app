import React,{Component} from 'react';
import {connect} from 'react-redux';
import {switchPanel} from '../actions/handleSidePanelAction';
import {LIST_WORK_THUNK} from '../actions/listWorkAction';
import {DELETE_WORK_THUNK} from '../actions/crudWorkAction';

const mapStateToProps = (state) => {
    return {
        isSidePanelOpen: state.handleSidePanelReducer.isSidePanelOpen,
        isCreateWork: state.handleSidePanelReducer.isCreateWork,
        listWork: state.listWorkReducer.listWork,
        currentPage: state.listWorkReducer.currentPage,
        totalPage: state.listWorkReducer.totalPage,
        message: state.crudWorkReducer.message
    } 
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
        handleSidePanel: (data) => dispatch(switchPanel(data)),
        renderListWork: (data) => dispatch(LIST_WORK_THUNK(data)),
        deleteWork: (data) => dispatch(DELETE_WORK_THUNK(data)),
    }
  }

class ListWork extends Component {
    delWork = (event) => {
        this.props.deleteWork({id: event.target.parentNode.parentNode.id});
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.message !== this.props.message){
            this.props.renderListWork({currentPage: this.props.currentPage})
        }
        if(this.props.currentPage > this.props.totalPage){
            this.props.renderListWork({ currentPage: this.props.totalPage, isMax: true})
        }
    }
    updtWork = (event) => {
        if(this.props.isSidePanelOpen){
            this.props.handleSidePanel({isCreateWork: true, isSidePanelOpen: true});
        } else {
            this.props.handleSidePanel({isCreateWork: false});
        }
        sessionStorage.setItem("id", event.target.parentNode.parentNode.id);
        sessionStorage.setItem("name", event.target.parentNode.parentNode.childNodes[1].innerText);
    }
    render(){
        return(
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
                    <button type="submit" className="btn btn-secondary btn-sm mr-2" onClick={this.delWork}><i className="fas fa-trash-alt"></i>&nbsp;&nbsp;Xóa</button> 
                    <button type="submit" className="btn btn-dark btn-sm" onClick={this.updtWork}><i className="fas fa-edit"></i>&nbsp;&nbsp;Sửa</button> 
                </td>
            </tr>)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWork);