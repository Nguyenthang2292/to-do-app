import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import MainPanel from './components/mainPanel';
import SidePanel from './components/sidePanel';
import Header from './components/header';
import { LIST_WORK_THUNK } from './actions/listWorkAction';

const mapStateToProps = (state) => {
  return {
    isSidePanelOpen: state.handleSidePanelReducer.isSidePanelOpen,
    listWork: state.listWorkReducer.listWork,
  } 
}

const mapDispatchToProps = (dispatch) => {
  return{
    renderListWork: (data) => dispatch(LIST_WORK_THUNK(data))
  }
}

class App extends Component {
  state = {
    isSearchMode: false,
    searchInputValue: '',
    listWorkSearch: [1],
    sortMode: "none",
  }
  // ------------------------------------------------------------------
  //                        LOAD DATA
  // ------------------------------------------------------------------
  componentDidMount(){
      this.props.renderListWork({
        currentPage: 1, 
        isMin: true,
        isMax: true,
      });
  }
  render(){
    const { isCreateWork} = this.state;
    return (
      <div className="container">
        <Header />
          {(!this.props.isSidePanelOpen) 
            ? (
              <div className="row">
                <div className="col">
                    <MainPanel onChange={this.handleSorting} />
                </div>
              </div>
            ) 
            : (
              <div className="row">
                <div className="col-4">
                  <SidePanel 
                    onSubmit={(isCreateWork) ? this.createWork : this.updateWorkSubmit}
                    onChange={this.getWorkInformation}
                  />
                </div>
                <div className="col-8">
                    <MainPanel onChange={this.handleSorting} />
                </div>
              </div>
            )} 
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
