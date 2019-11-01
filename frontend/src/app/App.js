import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Main from './components/main';
import Sidebar from './components/side';
import Header from './components/header';
import axios from 'axios';
import qs from 'querystring';
import { LIST_WORK_THUNK } from './actions/listWork';

const mapStateToProps = (state) => {
  return {
    isSidePanelOpen: state.handleSidePanelReducer,
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
      this.props.renderListWork();
  }


// ------------------------------------------------------------------
//                       HANDLE PAGINATION
// ------------------------------------------------------------------
  handlePagination = (event) => {
    let totalPage;
    (!this.state.isSearchMode) ? (totalPage = this.state.totalPageInit) : (totalPage = this.state.totalPage);
    switch(event.target.id){
      case("pagination-next"):
        {
          this.setState({
            isMin: false,
            currentPage: this.state.currentPage + 1
          });
          if(this.state.currentPage === totalPage - 1){
            this.setState({isMax: true})
          }
          this.getListWorkFromApi(this.state.currentPage + 1);
          break;
        }
        case("pagination-previous"):
        {
          this.setState({
            isMax: false,
            currentPage: this.state.currentPage - 1
          });
          if(this.state.currentPage === 2){
            this.setState({
                isMin: true
            })
          }
          this.getListWorkFromApi(this.state.currentPage - 1);
          break;
        }
    }
  }
// ------------------------------------------------------------------
//                        CRUD WORK 
// ------------------------------------------------------------------
  deleteWork = async (event) => {
    const {currentPage} = this.state;
    this.setState({
        isSearchMode: false
    })
    const id = event.target.parentNode.parentNode.id;
    await axios({
      method: 'delete',
      url: 'http://localhost:8000/work/',
      data: qs.stringify({id: id}),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }}).then((res) => console.log('Delete new work success !!! --> Message from Server: ', res.data.message))
        .catch((err) => console.log(err))
    // this.getListWorkFromApi(currentPage);
  }
  updateWork = (event) => {
    this.controlSidePanel();
    this.setState({ 
        name: event.target.parentNode.parentNode.childNodes[1].innerText,
        isSidePanelOpen: true,
        isCreateWork: false,
        isSearchMode: false
     });
     sessionStorage.setItem("id", event.target.parentNode.parentNode.id);
  }
  updateWorkSubmit = async (data) => {
    const {currentPage} = this.state;
    const id = sessionStorage.getItem("id");
    this.getListWorkFromApi(currentPage);
    this.setState({
            isSidePanelOpen: false,
            isCreateWork: true});
        sessionStorage.removeItem("id");
    }
    // ------------------------------------------------------------------
    //                        SEARCH WORK 
    // ------------------------------------------------------------------
    getPrimarySearchInformation = (event) => {
      const {totalPageInit} = this.state;
      this.setState({
          searchInputValue: event.target.value,
          isSearchMode: false,
          totalPage: totalPageInit
       });
    }
    primarySearch = (event) => {
      const {listWork, searchInputValue, listWorkSearch} = this.state;
      event.preventDefault();
      this.setState({
            isSearchMode: true,
            listWorkSearch: listWork.filter((el) => el.name.includes(searchInputValue)),
            totalPage: (Math.ceil(listWorkSearch.length/9) === 0) ? 1 : Math.ceil(listWorkSearch.length/9)
        });
    }
    getSecondarySearchInformation = (event) => {
      const {
        listWork, 
        listWorkSearch, 
        searchInputValue, 
        totalPage, 
        totalPageInit} = this.state;
      if(event.target.value){
            this.setState({
              searchInputValue: event.target.value,
              isSearchMode: true,
              listWorkSearch: listWork.filter((el) => el.name.includes(searchInputValue)),
              totalPage: (Math.ceil(listWorkSearch.length/9) === 0) ? 1 : Math.ceil(listWorkSearch.length/9)
            })
            if(totalPage === 1) {
              this.setState({
                isMax: true
              })
            }
        } else {
            this.setState({
              searchInputValue: "",
              isSearchMode: false,
              totalPage: totalPageInit ,
              isMax: false
            })
        }
    }
    // ------------------------------------------------------------------
    //                        SORT WORK 
    // ------------------------------------------------------------------
handleSorting = (event) => {
    this.setState({ 
        sortMode: event.target.value
     });
}
componentDidUpdate(prevProps, prevState){
  const {listWork, sortMode} = this.state;
  if(sortMode !== prevState.sortMode){
      switch(sortMode){
            case("increase"):
               this.setState({
                   listWork: listWork.sort((a,b) => a.name.localeCompare(b.name))
               });
                break;
            case("decrease"):
               this.setState({
                    listWork: listWork.sort((a,b) => b.name.localeCompare(a.name))
               });
               break;
            case("isActive"):
               this.setState({
                   listWork: [...listWork.filter((el) => el.status === "show").sort((a,b) =>  a.name.localeCompare(b.name)),...listWork.filter((el) => el.status === "hide").sort((a,b) =>  a.name.localeCompare(b.name))]
               });
               break;
            case("isDisable"):
                this.setState({
                    listWork: [...listWork.filter((el) => el.status === "hide").sort((a,b) =>  a.name.localeCompare(b.name)),...listWork.filter((el) => el.status === "show").sort((a,b) =>  a.name.localeCompare(b.name))]
                });
                break;
            default: 
                this.setState({
                    listWork: listWork
                })
        }
    this.renderListWork(listWork);
    }
}
  render(){
    const {
      isSearchMode, 
      listWorkSearch, 
      isCreateWork} = this.state;
    const MainPanel = <Main 
                            onClick={this.handlePagination}
                            onChange={this.handleSorting}
                            getPrimarySearchInformation={this.getPrimarySearchInformation}
                            getSecondarySearchInformation={this.getSecondarySearchInformation}
                            primarySearch={this.primarySearch}>
                            {/* {(!isSearchMode) ? this.renderListWork() : this.renderListWork(listWorkSearch)}  */}
                    </Main>
    return (
      <div className="container">
        <Header />
          {(!this.props.isSidePanelOpen) 
            ? (
              <div className="row">
                <div className="col">
                    {MainPanel}
                </div>
              </div>
            ) 
            : (
              <div className="row">
                <div className="col-4">
                  <Sidebar 
                    onSubmit={(isCreateWork) ? this.createWork : this.updateWorkSubmit}
                    onChange={this.getWorkInformation}
                    placeholder={(isCreateWork) ? "" : this.state.name}
                  />
                </div>
                <div className="col-8">
                    {MainPanel}
                </div>
              </div>
            )} 
      </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
