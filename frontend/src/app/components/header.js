import React,{Component} from 'react';
import {Avatar} from '@material-ui/core';

class Header extends Component{
    render(){
        return(
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row">
                        <Avatar style={{backgroundColor: "orange"}}>H</Avatar> <h5 style={{lineHeight: "40px"}}>&nbsp;&nbsp;Xin chào H</h5>
                    </div>
                    <h1>Quản Lý Công Việc</h1>
                </div>
                <div style={{height: '1px', backgroundColor: 'grey'}} className="mb-3"></div>
            </div>
        )
    }
}

export default Header;