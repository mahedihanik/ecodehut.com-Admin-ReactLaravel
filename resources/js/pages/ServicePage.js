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

class ServicePage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            loading:true,
            error:false,
            rowDataId:"",
            deleteBtnText:"Yes",
            buttonLoader:"d-none",
            show:false,
            showAddModal:false,
            serviceName:"",
            serviceDes:"",
            serviceImg:""
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);

        this.showModalAdd=this.showModalAdd.bind(this);
        this.hideModalAdd=this.hideModalAdd.bind(this);
        this.onServiceNameChange=this.onServiceNameChange.bind(this);
        this.onServiceDesChange=this.onServiceDesChange.bind(this);
        this.onServiceImgChange=this.onServiceImgChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
    }
    componentDidMount() {

        Axios.get('/ServiceList').then((response)=>{
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
        Axios.post('/ServiceDelete',{id:this.state.rowDataId}).then((response)=>{
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
            this.setState({loading:false,error:true})

        })

    }
    imageCellFormat(cell,row){
        return(
            <img className="table-cell-img" src={cell}/>
        )

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
    onServiceNameChange(event){
        this.setState({serviceName:event.target.value})
    }
    onServiceDesChange(event){
        this.setState({serviceDes:event.target.value})
    }
    onServiceImgChange(event){
        this.setState({serviceImg:event.target.files[0]})
    }
    addFormSubmit(event){
        event.preventDefault();
        let serviceName = this.state.serviceName;
        let serviceDes = this.state.serviceDes;
        let serviceImg = this.state.serviceImg;

        let myFormData=new FormData();
        myFormData.append('serviceName',serviceName);
        myFormData.append('serviceDes',serviceDes);
        myFormData.append('serviceImg',serviceImg);
        let url="/AddService";

        let config={
            headers:{'content-type':'multipart/form-data'}
        }
        Axios.post(url,myFormData,config).then((response)=>{
            if (response.data==1){
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
                {dataField: 'service_img', text: 'IMAGE', sort: true, headerAlign: 'center',formatter:this.imageCellFormat,align: 'center'},
                {dataField: 'service_name', text: 'SERVICE NAME', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'service_des', text: 'SERVICE DETAILS', sort: true, headerAlign: 'center',align: 'center'}
            ];
            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }

            }

            return (
                <Fragment>
                    <Menu title="Service">
                        <Container fluid={true} className="p-3">
                            <Row>
                                <Col sm={6} md={12} lg={12}>
                                    <ToolkitProvider keyField="id" data={ data } columns={ columns } search exportCSV>
                                        {
                                            props => (
                                                <div>
                                                    <Button onClick={this.showModal} className="deleteBtn shadow" variant="danger"><FontAwesomeIcon  icon={faTrash}/> Delete</Button>
                                                    <Button onClick={this.showModalAdd} className="shadow ml-3 insertBtn" variant="info"><FontAwesomeIcon  icon={faPlusCircle}/> Add</Button>
                                                    <Button  className="shadow ml-3 editBtn" variant="warning"><FontAwesomeIcon  icon={faEdit}/> Edit</Button>
                                                    <SearchBar className="tableSearch ml-5" { ...props.searchProps } />
                                                    <ExportCSVButton className="exportBtn btn-success shadow float-right" { ...props.csvProps }><FontAwesomeIcon  icon={faFileExport}/> Export CSV</ExportCSVButton>
                                                    <BootstrapTable condensed hover striped selectRow={selectRow} pagination={ paginationFactory() }{ ...props.baseProps } defaultSortDirection="asc"/>
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
                                    <Button variant="danger" onClick={this.dataDelete}><Spinner className={this.state.buttonLoader} as="span" animation="border" size="md" role="status" aria-hidden="true"/> {this.state.deleteBtnText}</Button>
                                    <Button variant="success" onClick={this.hideModal}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>
                            <Modal scrollable={true} size="lg" show={this.state.showAddModal} >
                                <Modal.Header>
                                    <Modal.Title>Add New Service</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.addFormSubmit}>
                                        <Form.Group>
                                            <Form.Label>Service Name</Form.Label>
                                            <Form.Control onChange={this.onServiceNameChange} type="text" placeholder="Service Name" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Service Descriptions</Form.Label>
                                            <Form.Control onChange={this.onServiceDesChange} type="text" placeholder="Service Descriptions" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Service Image</Form.Label>
                                            <Form.Control onChange={this.onServiceImgChange} type="file"/>
                                        </Form.Group>

                                        <Button className="exportBtn"  variant="success shadow" type="submit">
                                            Add Service
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

export default ServicePage;
