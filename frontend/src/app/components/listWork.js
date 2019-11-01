import React,{Component} from 'react';
import {connect} from 'react-redux';
import {UPDATE_WORK_THUNK} from '../actions/crudWorkAction';
import {switchPanel} from '../actions/handleSidePanelAction';

const mapStateToProps = (state) => {
    return {
        isSidePanelOpen: state.handleSidePanelReducer.isSidePanelOpen,
        isCreateWork: state.handleSidePanelReducer.isCreateWork,
        listWork: state.listWorkReducer.listWork,
    } 
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
        handleSidePanel: (data) => dispatch(switchPanel(data))
    }
  }

class ListWork extends Component {
    updateWork = (event) => {
        if(this.props.isSidePanelOpen){
            this.props.handleSidePanel({isCreateWork: true});
        } else {
            this.props.handleSidePanel({isCreateWork: false});
        }
        sessionStorage.setItem("id", event.target.parentNode.parentNode.id);
        sessionStorage.setItem("name", event.target.parentNode.parentNode.childNodes[1].innerText);
    }
    render(){
        console.log('list work component - is create new work', this.props.isCreateWork)
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
                    <button type="submit" className="btn btn-secondary btn-sm mr-2" onClick={this.deleteWork}><i className="fas fa-trash-alt"></i>&nbsp;&nbsp;Xóa</button> 
                    <button type="submit" className="btn btn-dark btn-sm" onClick={this.updateWork}><i className="fas fa-edit"></i>&nbsp;&nbsp;Sửa</button> 
                </td>
            </tr>)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWork);