import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ToolkitProvider, {CSVExport, Search} from "react-bootstrap-table2-toolkit";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFileExport, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactQuill from "react-quill";

class ProjectPage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            loading:true,
            error:false,
            rowDataId:"",
            deleteBtnText:"Yes",
            addBtnText:"Add Project",
            buttonLoader:"d-none",
            addButtonLoader:"d-none",
            show:false,
            showAddModal:false,
            projectName:"",
            projectDes:"",
            projectFeatures:"",
            projectPreviewUrl:"",
            projectDetailImg:"",
            projectCardImg:""

        }
        this.dataDelete=this.dataDelete.bind(this);
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.imageCellFormat=this.imageCellFormat.bind(this);
        this.showModalAdd=this.showModalAdd.bind(this);
        this.hideModalAdd=this.hideModalAdd.bind(this);
        this.onProjectDetailsImgChange=this.onProjectDetailsImgChange.bind(this);
        this.onProjectCardImgChange=this.onProjectCardImgChange.bind(this);
        this.onProjectPreLinkChange=this.onProjectPreLinkChange.bind(this);
        this.onProjectFeaturesChange=this.onProjectFeaturesChange.bind(this);
        this.onProjectDesChange=this.onProjectDesChange.bind(this);
        this.onProjectNameChange=this.onProjectNameChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);

    }
    componentDidMount() {

        Axios.get('/ProjectList').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,loading:false,error:false})
            }
            else{
                this.setState({loading:false,error:true})
            }
        }).catch((error)=>{
            this.setState({loading:false,error:true})
        })
    }

    dataDelete(){
        this.setState({buttonLoader:"d-block",deleteBtnText:""})
        Axios.post('/ProjectDelete',{id:this.state.rowDataId}).then((response)=>{
            if(response.data==1 && response.status==200){
                this.componentDidMount();
                this.setState({buttonLoader:"d-none",deleteBtnText:"Yes"})
                this.hideModal();
                toast.success('Data Deleted Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }else{
                this.hideModal();
                this.setState({buttonLoader:"d-none",deleteBtnText:"Yes"})
                toast.error('Data Delete Failed', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }

        }).catch((error)=>{
            this.hideModal();
            this.setState({buttonLoader:"d-none",deleteBtnText:"Yes"})
            toast.error('Data Delete Failed', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });


        })

    }
    showModal(){
        this.setState({ show: true });
    };

    hideModal(){
        this.setState({ show: false });
    };

    showModalAdd(){
        this.setState({ showAddModal: true });
    };

    hideModalAdd(){
        this.setState({ showAddModal: false });
    };

    imageCellFormat(cell,row){
        return(
            <img className="table-cell-img" src={cell}/>

        )

    }
    onProjectNameChange(event){
        this.setState({projectName:event.target.value})
    }
    onProjectDesChange(event){
        this.setState({projectDes:event.target.value})
    }
    onProjectFeaturesChange(content, delta, source, editor){
        let getHtmlContent=editor.getHTML();
        this.setState({projectFeatures:getHtmlContent})
    }
    onProjectPreLinkChange(event){
        this.setState({projectPreviewUrl:event.target.value})
    }
    onProjectCardImgChange(event){
        this.setState({projectCardImg:event.target.files[0]})
    }
    onProjectDetailsImgChange(event){
        this.setState({projectDetailImg:event.target.files[0]})
    }
    addFormSubmit(event){
        event.preventDefault();
        this.setState({addButtonLoader:"d-block",addBtnText:""})
        let projectName = this.state.projectName;
        let projectDes = this.state.projectDes;
        let projectFeatures = this.state.projectFeatures;
        let projectPreviewUrl = this.state.projectPreviewUrl;
        let projectCardImg = this.state.projectCardImg;
        let projectDetailImg = this.state.projectDetailImg;

        let myFormData=new FormData();
        myFormData.append('projectName',projectName);
        myFormData.append('projectDes',projectDes);
        myFormData.append('projectFeatures',projectFeatures);
        myFormData.append('projectPreviewUrl',projectPreviewUrl);
        myFormData.append('projectCardImg',projectCardImg);
        myFormData.append('projectDetailImg',projectDetailImg);
        let url="/AddProject";

        let config={
            headers:{'content-type':'multipart/form-data'}
        }
        Axios.post(url,myFormData,config).then((response)=>{
            if (response.data==1){
                this.setState({addButtonLoader:"d-none",addBtnText:"Add Project"})
                this.hideModalAdd();
                this.componentDidMount();
                toast.success('Data Added Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
            else {
                this.setState({addButtonLoader:"d-none",addBtnText:"Add Project"})
                toast.error('Data Insert Failed', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });

            }

        }).catch((error)=>{
            this.setState({addButtonLoader:"d-none",addBtnText:"Add Project"})
            toast.error('Data Insert Failed', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });

        })
    }

    render() {

        if(this.state.loading==true){
            return (
                <Menu>
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>

            )
        }
        else if (this.state.error==true){
            return (
                <Menu>
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }
        else{
            const { SearchBar} = Search;
            const { ExportCSVButton } = CSVExport;
            const data = this.state.dataList;
            const columns = [
                {dataField: 'id', text: 'ID' , sort: true , headerAlign: 'center',align: 'center'},
                {dataField: 'small_image', text: 'SMALL IMAGE', sort: true, headerAlign: 'center',formatter:this.imageCellFormat,align: 'center'},
                {dataField: 'project_name', text: 'PROJECT NAME', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'short_description', text: 'SHORT DETAILS', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'project_features', text: 'FEATURES', sort: true, headerAlign: 'center',align: 'center'},
            ];
            const selectRow={
                mode:'radio',
                clickToSelect: true,
                clickToExpand: true,
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }

            }
            const expandRow = {
                showExpandColumn: true,
                renderer: row => (
                    <div>
                        <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
                        <p>You can render anything here, also you can add additional data on every row object</p>
                    </div>
                )
            };

            return (
                <Fragment>
                    <Menu title="Project">
                        <Container fluid={true} className="p-3">
                            <Row>
                                <Col sm={6} md={12} lg={12}>

                                    <ToolkitProvider
                                        keyField="id"
                                        data={ data }
                                        columns={ columns }
                                        search
                                        exportCSV
                                    >
                                        {
                                            props => (
                                                <div>
                                                    <Button onClick={this.showModal} className="shadow deleteBtn" variant="danger"><FontAwesomeIcon  icon={faTrash}/> Delete</Button>
                                                    <Button onClick={this.showModalAdd} className="shadow ml-3 insertBtn" variant="info"><FontAwesomeIcon  icon={faPlusCircle}/> Add</Button>
                                                    <Button  className="shadow ml-3 editBtn" variant="warning"><FontAwesomeIcon  icon={faEdit}/> Edit</Button>
                                                    <SearchBar className="tableSearch ml-5" { ...props.searchProps } />
                                                    <ExportCSVButton className="btn-success exportBtn shadow float-right" { ...props.csvProps }><FontAwesomeIcon  icon={faFileExport}/> Export CSV</ExportCSVButton>
                                                    <BootstrapTable bordered expandRow={ expandRow } condensed hover striped selectRow={selectRow} pagination={ paginationFactory() } { ...props.baseProps } defaultSortDirection="asc"/>
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </Col>
                            </Row>
                            <Modal show={this.state.show} >
                                <Modal.Header>
                                    <Modal.Title>Delete an Entry</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Do you want to DELETE this entry ?</Modal.Body>
                                <Modal.Footer>
                                    <Button className="exportBtn" variant="danger" onClick={this.dataDelete}><Spinner className={this.state.buttonLoader} as="span" animation="border" size="md" role="status" aria-hidden="true"/> {this.state.deleteBtnText}</Button>
                                    <Button className="exportBtn" variant="success" onClick={this.hideModal}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal scrollable={true} size="lg" show={this.state.showAddModal} >
                                <Modal.Header>
                                    <Modal.Title>Add New Project</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.addFormSubmit}>
                                        <Form.Group>
                                            <Form.Label>Project Name</Form.Label>
                                            <Form.Control onChange={this.onProjectNameChange} type="text" placeholder="Project Name" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Short Descriptions</Form.Label>
                                            <Form.Control onChange={this.onProjectDesChange} type="text" placeholder="Short Descriptions" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Project Features</Form.Label>
                                            <ReactQuill onChange={this.onProjectFeaturesChange} theme="snow" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Project Preview Link</Form.Label>
                                            <Form.Control onChange={this.onProjectPreLinkChange} type="text" placeholder="Preview Link" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Project Card Image</Form.Label>
                                            <Form.Control onChange={this.onProjectCardImgChange} type="file"/>
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Project Details Image</Form.Label>
                                            <Form.Control onChange={this.onProjectDetailsImgChange} type="file"/>
                                        </Form.Group>

                                        <Button className="exportBtn"  variant="success shadow" type="submit">
                                            <Spinner className={this.state.addButtonLoader} as="span" animation="border" size="md" role="status" aria-hidden="true"/> {this.state.addBtnText}
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className="exportBtn"  variant="danger shadow" onClick={this.hideModalAdd}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>
                        <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable={false}
                            pauseOnHover
                        />
                    </Menu>
                </Fragment>
            );
        }

    }
}

export default ProjectPage;
