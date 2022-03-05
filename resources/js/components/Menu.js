import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Nav, Navbar, NavLink, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressBook,
    faBars,
    faCloud, faComment,
    faEnvelopeOpen,
    faHome,
    faPowerOff,
    faProjectDiagram,
    faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {faServicestack} from "@fortawesome/free-brands-svg-icons";

class Menu extends Component {
    constructor(props) {
        super();
        this.state={
            sideNav:false,
            sideNavClass:"sidenavClose",
            NavText:"d-none",
            mainDivOverlay:"main-overlay-close",
        }

        this.showHideSideNav=this.showHideSideNav.bind(this);
    }


    showHideSideNav(){
        if(this.state.sideNav===false){
            this.setState({sideNav:true,NavText:"",sideNavClass:"sidenavOpen",mainDivOverlay:"main-overlay-open"})
        }
        else {
            this.setState({sideNav:false,NavText:"d-none",sideNavClass:"sidenavClose",mainDivOverlay:"main-overlay-close"})
        }
    }


    render() {
        return (
            <Fragment>
                <title>{this.props.title}</title>
                <Navbar  expand="lg" className="fixed-top shadow-sm bg-white " variant="light" bg="white">
                    <Navbar.Brand onClick={this.showHideSideNav}  href="#"><FontAwesomeIcon icon={faBars} /></Navbar.Brand>
                </Navbar>

                <div className={this.state.sideNavClass}>
                    <NavLink><Link to="/"><FontAwesomeIcon className="iconColor" icon={faHome}/><span style={{color: "white"}} className={this.state.NavText}> Home</span></Link></NavLink>
                    <NavLink className="mt-2"><Link to="/Project"><FontAwesomeIcon className="iconColor" icon={faProjectDiagram}/><span style={{color: "white"}} className={this.state.NavText}> Project</span></Link></NavLink>
                    <NavLink className="mt-2"><Link to="/Course"><FontAwesomeIcon className="iconColor" icon={faAddressBook}/><span style={{color: "white"}} className={this.state.NavText}> Course</span></Link></NavLink>
                    <NavLink className="mt-2"><Link to="/Service"><FontAwesomeIcon className="iconColor" icon={faServicestack}/><span style={{color: "white"}} className={this.state.NavText}> Service</span></Link></NavLink>
                    <NavLink className="mt-2"><Link to="/Contact"><FontAwesomeIcon className="iconColor" icon={faEnvelopeOpen}/><span style={{color: "white"}} className={this.state.NavText}> Contact</span></Link></NavLink>
                    <NavLink className="mt-2"><Link to="/Review"><FontAwesomeIcon className="iconColor" icon={faComment}/><span style={{color: "white"}} className={this.state.NavText}> Review</span></Link></NavLink>
                    <hr className="w-100" style={{background:"white"}}/>
                    <a className="ml-3 logoutNavItem" href="/Logout"><FontAwesomeIcon className="iconColorLogout" icon={faPowerOff}/><span style={{color: "white"}} className={this.state.NavText}> Logout</span></a>

                </div>
                <div onClick={this.showHideSideNav} className={this.state.mainDivOverlay}>

                </div>

               <div className="mainDiv">
                   {this.props.children}
               </div>

            </Fragment>
        );
    }
}

export default Menu;
