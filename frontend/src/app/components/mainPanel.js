import React, {Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import ListWork from './listWork';
import {switchPanel} from '../actions/handleSidePanelAction';
import {LIST_WORK_THUNK} from '../actions/listWorkAction';

const mapStateToProps = (state) => {
    return {
        isSidePanelOpen: state.handleSidePanelReducer.isSidePanelOpen,
        //------------------------------------------------------------
        listWork: state.listWorkReducer.listWork,
        currentPage: state.listWorkReducer.currentPage,
        totalPage: state.listWorkReducer.totalPage,
        isMin: state.listWorkReducer.isMin,
        isMax: state.listWorkReducer.isMax,
        isMode: state.listWorkReducer.isMode,
    } 
  }

const mapDispatchToProps = (dispatch) => {
  return {
    handleSidePanel: (data) => dispatch(switchPanel(data)),
    renderListWork: (data) => dispatch(LIST_WORK_THUNK(data)),
  }
}

class MainPanel extends Component{
    state ={
        searchInputValue: '',
        sortValue: "none",
    }
    swtchPanel = () => {
        this.props.handleSidePanel({isSidePanelOpen: this.props.isSidePanelOpen})
    }
// ------------------------------------------------------------------
//                       HANDLE PAGINATION
// ------------------------------------------------------------------
  handlePagination = (event) => {
    switch(event.target.id){
      case("pagination-next"):
        {
            this.props.renderListWork({
                isMin: false,
                currentPage: this.props.currentPage + 1,
                isMode: this.props.isMode
            });
          break;
        }
        case("pagination-previous"):
        {
            this.props.renderListWork({
                isMax: false,
                currentPage: this.props.currentPage - 1,
                isMode: this.props.isMode
            });
          break;
        }
    }
  }
// ------------------------------------------------------------------
//                        SEARCH WORK 
// ------------------------------------------------------------------
  getPrimarySearchInformation = (event) => {
    this.setState({
        searchInputValue: event.target.value
    });
  }
  primarySearch = (event) => {
    const {searchInputValue} = this.state;
    event.preventDefault();
    this.props.renderListWork({
        searchInputValue: searchInputValue, 
        isMode: "search", 
        currentPage: this.props.currentPage})
  }
  getSecondarySearchInformation = (event) => {
    const {searchInputValue} = this.state;
    this.setState({
        searchInputValue: event.target.value
    });
    event.preventDefault();
    this.props.renderListWork({
        searchInputValue: searchInputValue,
        isMode: "search",
        currentPage: this.props.currentPage
    });
  }
  backToPrev = (event) => {
    this.props.renderListWork({
        isMode: "none",
        currentPage: this.props.currentPage
    });
  }
  // ------------------------------------------------------------------
//                        SORT WORK 
// ------------------------------------------------------------------
handleSorting = (event) => {
    event.preventDefault();
    this.setState({ 
        sortValue: event.target.value
     });
}
componentDidUpdate(prevProps, prevState){
  if(this.state.sortValue !== prevState.sortValue){
        this.props.renderListWork({
            isMode: "sort", 
            sortValue: this.state.sortValue, 
            currentPage: this.props.currentPage
        })
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
                            <input type="text" className="form-control" placeholder="Nhập từ khóa..." onChange={this.getPrimarySearchInformation}/>
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="submit" onClick={this.primarySearch}>
                                <i className="fas fa-search"></i>
                                &nbsp;Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-inline float-right">
                            <label className="mr-3">Sắp xếp</label>
                            <div className="form-group">
                                <select 
                                    className="form-control"
                                    onChange={this.handleSorting}>
                                    <option value="none"></option>
                                    <option value="increase">Thứ tự A-Z</option>
                                    <option value="decrease">Thứ tự Z-A</option>
                                    <option value="isActive">Đang hoạt động</option>
                                    <option value="isDisable">Chưa hoạt động</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <ul className="pagination float-right">
                            <li className={classNames("page-item",{"disabled": this.props.isMin})} onClick={this.handlePagination}><span className="page-link" id="pagination-previous">Trang trước</span></li>
                            <li className={"page-item"}><span className="page-link">{this.props.currentPage} / {this.props.totalPage}</span></li>
                            <li className={classNames("page-item",{"disabled": this.props.isMax})} onClick={this.handlePagination}><span className="page-link" id="pagination-next">Trang kế</span></li>
                        </ul>
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
                            <th scope="row">
                                {(this.props.isMode === "search") ? <i className="fas fa-arrow-alt-circle-left fa-2x" id="close-button" onClick={this.backToPrev}> </i>  : null}
                            </th>
                            <th>
                                <div className="input-group input-group-sm mb-3">
                                    <input type="text" className="form-control" placeholder="Tìm kiếm nhanh.." onChange={this.getSecondarySearchInformation}/>
                                </div>
                            </th>
                            <th>
                                <div className="form-group">
                                    <select className="form-control-sm w-100" onChange={this.handleSorting}>
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
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainPanel);