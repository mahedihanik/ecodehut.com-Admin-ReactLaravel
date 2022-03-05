import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {Button, Col, Container, Modal, Row, Spinner} from "react-bootstrap";
import Axios from "axios";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ToolkitProvider, { Search , CSVExport } from 'react-bootstrap-table2-toolkit';
import {faFileExport,faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ToastContainer , toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
class ContactPage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            loading:true,
            error:false,
            rowDataId:"",
            deleteBtnText:"Yes",
            buttonLoader:"d-none",
            show:false

        }
        this.dataDelete=this.dataDelete.bind(this);
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
    }
    componentDidMount() {

        Axios.get('/ContactList').then((response)=>{
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
        Axios.post('/ContactDelete',{id:this.state.rowDataId}).then((response)=>{
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
                {dataField: 'name', text: 'NAME', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'email', text: 'EMAIL', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'subject', text: 'SUBJECT', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'message', text: 'MESSAGE', sort: true, headerAlign: 'center',align: 'center'}

            ];
            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }

            }

            return (
                <Fragment>
                    <Menu title="Contact">
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
                                                    <Button onClick={this.showModal} className="deleteBtn shadow" variant="danger"><FontAwesomeIcon  icon={faTrash}/> Delete</Button>
                                                    <SearchBar className="ml-5 tableSearch" { ...props.searchProps } />
                                                    <ExportCSVButton className="btn-success exportBtn shadow float-right" { ...props.csvProps }><FontAwesomeIcon  icon={faFileExport}/> Export CSV</ExportCSVButton>
                                                    <BootstrapTable responsive  hover striped selectRow={selectRow} pagination={ paginationFactory() }
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
                                    <Button className="exportBtn"  variant="danger" onClick={this.dataDelete}><Spinner className={this.state.buttonLoader} as="span" animation="border" size="md" role="status" aria-hidden="true"/> {this.state.deleteBtnText}</Button>
                                    <Button className="exportBtn"  variant="success" onClick={this.hideModal}>Cancel</Button>
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

export default ContactPage;
