import React, {Component} from 'react';
import classNames from 'classnames';

class Main extends Component{
    render(){
        return( 
            <div>
                <div className="row mb-3 pl-3">
                    <button type="button" 
                        className="btn btn-dark"
                        onClick={this.props.addWork}>
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
                        {this.props.children}
                    </tbody>
                </table>
                <ul className="pagination">
                    <li className={classNames("page-item",{"disabled": this.props.isMin})} onClick={this.props.onClick}><span className="page-link" id="pagination-previous">Previous</span></li>
                    <li className={"page-item"}><span className="page-link">{this.props.currentPage} / {this.props.totalPage}</span></li>
                    <li className={classNames("page-item",{"disabled": this.props.isMax})} onClick={this.props.onClick}><span className="page-link" id="pagination-next">Next</span></li>
                </ul>
            </div>
        );
    }
}

export default Main;