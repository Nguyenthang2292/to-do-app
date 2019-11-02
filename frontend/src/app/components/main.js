import React, {Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import ListWork from './listWork';
import {switchPanel} from '../actions/handleSidePanelAction';
import {LIST_WORK_THUNK} from '../actions/listWorkAction';

const mapStateToProps = (state) => {
    return {
        isSidePanelOpen: state.handleSidePanelReducer.isSidePanelOpen,
        currentPage: state.listWorkReducer.currentPage,
        totalPageInit: state.listWorkReducer.totalPageInit,
        totalPage: state.listWorkReducer.totalPage,
        isMin: state.listWorkReducer.isMin,
        isMax: state.listWorkReducer.isMax,
        isSearchMode: state.listWorkReducer.isSearchMode,
    } 
  }

const mapDispatchToProps = (dispatch) => {
  return {
    handleSidePanel: (data) => dispatch(switchPanel(data)),
    renderListWork: (data) => dispatch(LIST_WORK_THUNK(data))
  }
}

class Main extends Component{
    swtchPanel = () => {
        this.props.handleSidePanel({isSidePanelOpen: this.props.isSidePanelOpen})
    }
    // ------------------------------------------------------------------
//                       HANDLE PAGINATION
// ------------------------------------------------------------------
  handlePagination = (event) => {
    let totalPage = this.props.totalPageInit;
    // (!this.props.isSearchMode) ? (totalPage = this.props.totalPageInit) : (totalPage = this.props.totalPage);
    switch(event.target.id){
      case("pagination-next"):
        {
            this.props.renderListWork({
                isMin: false,
                currentPage: this.props.currentPage + 1
            });
          break;
        }
        case("pagination-previous"):
        {
            this.props.renderListWork({
                isMax: false,
                currentPage: this.props.currentPage - 1
            });
          break;
        }
    }
  }
    render(){
        return( 
            <div>
                <div className="row mb-3 pl-3">
                    <button type="button" 
                        className="btn btn-dark"
                        onClick={this.swtchPanel}>
                        <i className="fas fa-plus"></i>
                        &nbsp;Thêm công việc
                    </button>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nhập từ khóa..." onChange={this.props.getPrimarySearchInformation}/>
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="submit" onClick={this.props.primarySearch}>
                                <i className="fas fa-search"></i>
                                &nbsp;Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-inline">
                            <label className="mr-3">Sắp xếp</label>
                            <div className="form-group">
                                <select 
                                    className="form-control"
                                    onChange={this.props.onChange}>
                                    <option value="none"></option>
                                    <option value="increase">Thứ tự A-Z</option>
                                    <option value="decrease">Thứ tự Z-A</option>
                                    <option value="isActive">Đang hoạt động</option>
                                    <option value="isDisable">Chưa hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <th>
                                <div className="input-group input-group-sm mb-3">
                                    <input type="text" className="form-control" placeholder="Tìm kiếm nhanh.." onChange={this.props.getSecondarySearchInformation}/>
                                </div>
                            </th>
                            <th>
                                <div className="form-group">
                                    <select className="form-control-sm w-100" onChange={this.props.onChange}>
                                        <option value="isActive">Đang hoạt động</option>
                                        <option value="isDisable">Chưa hoạt động</option>
                                    </select>
                                </div>
                            </th>
                            <td></td>
                        </tr>
                        <ListWork />
                    </tbody>
                </table>
                <ul className="pagination">
                    <li className={classNames("page-item",{"disabled": this.props.isMin})} onClick={this.handlePagination}><span className="page-link" id="pagination-previous">Previous</span></li>
                    <li className={"page-item"}><span className="page-link">{this.props.currentPage} / {this.props.totalPage}</span></li>
                    <li className={classNames("page-item",{"disabled": this.props.isMax})} onClick={this.handlePagination}><span className="page-link" id="pagination-next">Next</span></li>
                </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);