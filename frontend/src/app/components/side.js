import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CREATE_WORK_THUNK} from '../actions/crudWork';
import {LIST_WORK_THUNK} from '../actions/listWork';

const mapStateToProps = (state) => {
    return {
        isCreateWork: state.crudWorkReducer.isCreateWork,
        currentPage: state.listWorkReducer.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      closeSidePanel: () => dispatch({ type: 'CLOSE_PANEL'}),
      createWork: (data) => dispatch(CREATE_WORK_THUNK(data)),
      updateWork: () => dispatch({type: "UPDATE_WORK"}),
      renderListWork: (data) => dispatch(LIST_WORK_THUNK(data))
    }
  }

class Sidebar extends Component {
    state = {
        name: '',
        status: "show",
        isCreateWork: this.props.isCreateWork,
        currentPage: this.props.currentPage,
    }
    getWorkInformation = (event) => {
        this.setState({
          [event.target.id] : event.target.value
        });
      }
    onSubmit = (event) => {
        const {name, status, isCreateWork} = this.state;
        event.preventDefault();
        if (isCreateWork) {
            this.props.createWork({
                name: name, 
                status: status});
            this.props.renderListWork({currentPage: this.state.currentPage});
        } else {
            this.props.updateWork();
        }
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
                    onClick={this.props.closeSidePanel}></i>
                </div>
                <form className="card-body" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Tên</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        onChange={this.getWorkInformation}
                        placeholder={this.props.placeholder}
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
                        <button type="button" className="btn btn-secondary" onClick={this.props.closeSidePanel}>
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
