import React, {Component} from 'react';

class Sidebar extends Component {
    state = {
        name: '',
        status: "show"
    }
    getWorkInformation = (event) => {
        this.setState({
          [event.target.id] : event.target.value
        });
      }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
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
                    onClick={this.props.onClick}></i>
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
