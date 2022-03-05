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

class CoursePage extends Component {
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
            shortTitleCourse:"",
            longTitleCourse:"",
            shortDesCourse:"",
            longDesCourse:"",
            totalLectures:"",
            totalStudents:"",
            skillYouGet:"",
            videoLinkCourse:"",
            previewLinkCourse:"",
            courseImage:""
        }
        this.dataDelete=this.dataDelete.bind(this);
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.imageCellFormat=this.imageCellFormat.bind(this);

        this.showModalAdd=this.showModalAdd.bind(this);
        this.hideModalAdd=this.hideModalAdd.bind(this);
        this.onShortTitleChange=this.onShortTitleChange.bind(this);
        this.onLongTitleChange=this.onLongTitleChange.bind(this);
        this.onShortDesChange=this.onShortDesChange.bind(this);
        this.onLongDesChange=this.onLongDesChange.bind(this);
        this.onTotalLecturesChange=this.onTotalLecturesChange.bind(this);
        this.onTotalStudentsChange=this.onTotalStudentsChange.bind(this);
        this.onSkillChange=this.onSkillChange.bind(this);
        this.onVideoLinkChange=this.onVideoLinkChange.bind(this);
        this.onPreviewLinkChange=this.onPreviewLinkChange.bind(this);
        this.onCourseImgChange=this.onCourseImgChange.bind(this);
        this.addFormSubmit=this.addFormSubmit.bind(this);
    }
    componentDidMount() {

        Axios.get('/CourseList').then((response)=>{
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
        Axios.post('/CourseDelete',{id:this.state.rowDataId}).then((response)=>{
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



    onShortTitleChange(event){
        this.setState({shortTitleCourse:event.target.value})
    }
    onLongTitleChange(event){
        this.setState({longTitleCourse:event.target.value})
    }
    onShortDesChange(event){
        this.setState({shortDesCourse:event.target.value})
    }
    onLongDesChange(event){
        this.setState({longDesCourse:event.target.value})
    }
    onTotalLecturesChange(event){
        this.setState({totalLectures:event.target.value})
    }
    onTotalStudentsChange(event){
        this.setState({totalStudents:event.target.value})
    }
    onSkillChange(content, delta, source, editor){
        let getHtmlContent=editor.getHTML();
        this.setState({skillYouGet:getHtmlContent})
    }
    onVideoLinkChange(event){
        this.setState({videoLinkCourse:event.target.value})
    }
    onPreviewLinkChange(event){
        this.setState({previewLinkCourse:event.target.value})
    }
    onCourseImgChange(event){
        this.setState({courseImage:event.target.files[0]})
    }
    addFormSubmit(event){
        event.preventDefault();
        let shortTitleCourse = this.state.shortTitleCourse;
        let longTitleCourse = this.state.longTitleCourse;
        let shortDesCourse = this.state.shortDesCourse;
        let longDesCourse = this.state.longDesCourse;
        let totalLectures = this.state.totalLectures;
        let totalStudents = this.state.totalStudents;
        let skillYouGet = this.state.skillYouGet;
        let videoLinkCourse = this.state.videoLinkCourse;
        let previewLinkCourse = this.state.previewLinkCourse;
        let courseImage = this.state.courseImage;

        let myFormData=new FormData();
        myFormData.append('shortTitleCourse',shortTitleCourse);
        myFormData.append('longTitleCourse',longTitleCourse);
        myFormData.append('shortDesCourse',shortDesCourse);
        myFormData.append('longDesCourse',longDesCourse);
        myFormData.append('totalLectures',totalLectures);
        myFormData.append('totalStudents',totalStudents);
        myFormData.append('skillYouGet',skillYouGet);
        myFormData.append('videoLinkCourse',videoLinkCourse);
        myFormData.append('previewLinkCourse',previewLinkCourse);
        myFormData.append('courseImage',courseImage);
        let url="/AddCourse";

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
                {dataField: 'small_img', text: 'SMALL IMAGE', sort: true, headerAlign: 'center',formatter:this.imageCellFormat,align: 'center'},
                {dataField: 'short_title', text: 'SHORT TITLE', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'short_des', text: 'SHORT DESCRIPTION', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'totai_lecture', text: 'TOTAL LECTURES', sort: true, headerAlign: 'center',align: 'center'},
                {dataField: 'total_student', text: 'TOTAL STUDENTS', sort: true, headerAlign: 'center',align: 'center'}
            ];
            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }

            }

            return (
                <Fragment>
                    <Menu title="Course">
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
                                                    <Button onClick={this.showModalAdd} className="shadow ml-3 insertBtn" variant="info"><FontAwesomeIcon  icon={faPlusCircle}/> Add</Button>
                                                    <Button  className="shadow ml-3 editBtn" variant="warning"><FontAwesomeIcon  icon={faEdit}/> Edit</Button>
                                                    <SearchBar className="tableSearch ml-5" { ...props.searchProps } />
                                                    <ExportCSVButton className="btn-success exportBtn shadow float-right" { ...props.csvProps }><FontAwesomeIcon  icon={faFileExport}/> Export CSV</ExportCSVButton>
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
                                    <Modal.Title>Add New Course</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={this.addFormSubmit}>
                                        <Form.Group>
                                            <Form.Label>Course Short Title</Form.Label>
                                            <Form.Control onChange={this.onShortTitleChange} type="text" placeholder="Short Title" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Course Long Title</Form.Label>
                                            <Form.Control onChange={this.onLongTitleChange} type="text" placeholder="Long Title" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Short Description</Form.Label>
                                            <Form.Control onChange={this.onShortDesChange} type="text" placeholder="Short Description" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Long Description</Form.Label>
                                            <Form.Control onChange={this.onLongDesChange} type="text" placeholder="Long Description" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Total Lectures</Form.Label>
                                            <Form.Control onChange={this.onTotalLecturesChange} type="text" placeholder="Total Lectures" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Total Students</Form.Label>
                                            <Form.Control onChange={this.onTotalStudentsChange} type="text" placeholder="Total Students" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Skill You Get</Form.Label>
                                            <ReactQuill onChange={this.onSkillChange} theme="snow" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Video URL</Form.Label>
                                            <Form.Control onChange={this.onVideoLinkChange} type="text" placeholder="Youtube Link" />
                                            <Form.Text className="text-muted">
                                                Example : https://www.youtube.com/embed/Video ID
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Preview URL</Form.Label>
                                            <Form.Control onChange={this.onPreviewLinkChange} type="text" placeholder="Preview Link" />
                                        </Form.Group>

                                        <Form.Group >
                                            <Form.Label>Course Image</Form.Label>
                                            <Form.Control onChange={this.onCourseImgChange} type="file"/>
                                        </Form.Group>

                                        <Button className="exportBtn"  variant="success shadow" type="submit">
                                            Add Course
                                        </Button>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger exportBtn shadow" onClick={this.hideModalAdd}>
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

export default CoursePage;
