import React, {Component} from 'react';

class Sidebar extends Component {
    render(){
        return(
            <div className="card">
                <div className="card-header bg-dark text-white">
                    Thêm Công Việc 
                    <i 
                    className="fas fa-times-circle float-right" 
                    style={{lineHeight: '24px'}}
                    id="close-button"
                    onClick={this.props.onClick}></i>
                </div>
                <form className="card-body" onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label>Tên</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        onChange={this.props.onChange}
                        placeholder={this.props.placeholder}
                        />
                    </div>
                    <div className="form-group">
                          <label>Trạng Thái</label>
                          <select 
                            className="form-control" 
                            id="status" 
                            onChange={this.props.onChange}
                            value={this.props.value}>
                            <option value="show">Kích hoạt</option>
                            <option value="hide">Ẩn</option>
                          </select>
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="submit" className="btn btn-dark">
                           <i className="fas fa-plus"></i>
                            &nbsp;&nbsp;Lưu lại
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={this.props.onClick}>
                            <i className="fas fa-times"></i>
                            &nbsp;&nbsp;Hủy Bỏ
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Sidebar;
