import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CREATE_WORK_THUNK, UPDATE_WORK_THUNK} from '../actions/crudWorkAction';
import {LIST_WORK_THUNK} from '../actions/listWorkAction';
import {closePanel} from '../actions/handleSidePanelAction';

const mapStateToProps = (state) => {
    return {
        isCreateWork: state.handleSidePanelReducer.isCreateWork,
        currentPage: state.listWorkReducer.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      closeSidePanel: (data) => dispatch(closePanel(data)),
      createWork: (data) => dispatch(CREATE_WORK_THUNK(data)),
      updateWork: (data) => dispatch(UPDATE_WORK_THUNK(data)),
      renderListWork: (data) => dispatch(LIST_WORK_THUNK(data))
    }
  }

class Sidebar extends Component {
    state = {
        name: '',
        status: "show",
    }
    getWorkInformation = (event) => {
        this.setState({
          [event.target.id] : event.target.value
        });
      }
    onSubmit = (event) => {
        const {name, status} = this.state;
        event.preventDefault();
        if (this.props.isCreateWork) {
            this.props.createWork({
                name: name, 
                status: status});
            this.props.renderListWork({currentPage: this.props.currentPage});
        } else {
            const user = {
                id: sessionStorage.getItem("id"),
                name: sessionStorage.getItem("name"),
                status: this.state.status,
            }
            this.props.updateWork(user);
            sessionStorage.clear();
            this.props.renderListWork({currentPage: this.props.currentPage});
        }
    }
    clsPanel = () => {
        this.props.closeSidePanel({isSidePanelOpen: false});
    }
    render(){
        return(
            <div className="card">
                <div className="card-header bg-dark text-white">
                    Thêm Công Việc 
                    <i 
                    className="fas fa-times-circle float-right" 
                    style={{lineHeight: '24px'}}
                    id="close-button"
                    onClick={this.clsPanel}></i>
                </div>
                <form className="card-body" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        onChange={this.getWorkInformation}
                        placeholder={(this.props.isCreateWork) ? "" : sessionStorage.getItem("name")}
                        />
                    </div>
                    <div className="form-group">
                          <label>Trạng Thái</label>
                          <select 
                            className="form-control" 
                            id="status" 
                            onChange={this.getWorkInformation}>
                            <option value="show">Kích hoạt</option>
                            <option value="hide">Ẩn</option>
                          </select>
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="submit" className="btn btn-dark">
                           <i className="fas fa-plus"></i>
                            &nbsp;&nbsp;Lưu lại
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={this.clsPanel}>
                            <i className="fas fa-times"></i>
                            &nbsp;&nbsp;Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
