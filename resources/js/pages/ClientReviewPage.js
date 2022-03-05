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
class ClientReviewPage extends Component {
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
            clientName:"",
            clientDes:"",
            clientImg:""
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.imageCellFormat=this.imageCellFormat.bind(this);
        this.showModalAdd=this.showModalAdd.bind(this);
        this.hideModalAdd=this.hideModalAdd.bind(this);

        this.onClientNameChange=this.onClientNameChange.bind(this);
        this.onClientDesChange=this.onClientDesChange.bind(this);
        this.onClientImgChange=this.onClientImgChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
    }
    componentDidMount() {

        Axios.get('/ReviewList').then((response)=>{
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
        Axios.post('/ReviewDelete',{id:this.state.rowDataId}).then((response)=>{
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
    showModal(){
        this.setState({ show: true });
    };

    hideModal(){
        this.setState({ show: false });
    };
    imageCellFormat(cell,row){
        return(
            <img className="table-cell-img" src={cell}/>
        )

    }
    showModalAdd(){
        this.setState({ showAddModal: true });
    };

    hideModalAdd(){
        this.setState({ showAddModal: false });
    };
    onClientNameChange(event){
        this.setState({clientName:event.target.value})
    }
    onClientDesChange(event){
        this.setState({clientDes:event.target.value})
    }
    onClientImgChange(event){
        this.setState({clientImg:event.target.files[0]})
    }
    addFormSubmit(event){
        event.preventDefault();
        let clientName = this.state.clientName;
        let clientDes = this.state.clientDes;
        let clientImg = this.state.clientImg;

        let myFormData=new FormData();
        myFormData.append('clientName',clientName);
        myFormData.append('clientDes',clientDes);
        myFormData.append('clientImg',clientImg);
        let url="/AddReview";

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
                {dataField: 'client_img', text: 'CLIENT IMAGE', sort: true, headerAlign: 'center',formatter:this.imageCellFormat,align: 'center'},
                {dataField: 'client_title', text: 'CLIENT NAME', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'client_des', text: 'CLIENT COMMENTS', sort: true, headerAlign: 'center',align: 'center'}
            ];
            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }

            }

            return (
                <Fragment>
                    <Menu title="Review">
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
                                                    <ExportCSVButton className="exportBtn btn-success shadow float-right" { ...props.csvProps }><FontAwesomeIcon  icon={faFileExport}/> Export CSV</ExportCSVButton>
                                                    <BootstrapTable condensed hover striped selectRow={selectRow} pagination={ paginationFactory() }
                                                                    { ...props.baseProps } defaultSortDirection="asc"
                                                    />
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
                                    <Modal.Title>Add New Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.addFormSubmit}>
                                        <Form.Group>
                                            <Form.Label>Client Name</Form.Label>
                                            <Form.Control onChange={this.onClientNameChange} type="text" placeholder="Client Name" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Client Descriptions</Form.Label>
                                            <Form.Control onChange={this.onClientDesChange} type="text" placeholder="Client Descriptions" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Client Image</Form.Label>
                                            <Form.Control onChange={this.onClientImgChange} type="file"/>
                                        </Form.Group>

                                        <Button className="exportBtn"  variant="success shadow" type="submit">
                                            Add Review
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

export default ClientReviewPage;
