import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {faBookReader, faEnvelopeOpenText, faProjectDiagram, faServer, faUserFriends} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Axios from "axios";
import WentWrong from "../components/wentWrong";
import {
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    Legend,
    Bar,
    Line,
    Sector, PieChart, Pie,
} from 'recharts';


class HomePage extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            error:false,
            review:"",
            contact:"",
            project:"",
            course:"",
            service:"",
            spinnerCom:"d-none",
            activeIndex: 0,
            dataChart:[
                {
                    name: 'Page A', uv: 590, pv: 800, amt: 1400,
                },
                {
                    name: 'Page B', uv: 868, pv: 967, amt: 1506,
                },
                {
                    name: 'Page C', uv: 1397, pv: 1098, amt: 989,
                },
                {
                    name: 'Page D', uv: 1480, pv: 1200, amt: 1228,
                },
                {
                    name: 'Page E', uv: 1520, pv: 1108, amt: 1100,
                },
                {
                    name: 'Page F', uv: 1400, pv: 680, amt: 1700,
                }
            ],
            dataCircle:[
                { name: 'Laravel', value: 40 },
                { name: 'React', value: 30 },
                { name: 'Vue', value: 30 },
                { name: 'Angular', value: 60 },
                { name: 'Lumen', value: 20 },
                { name: 'MySQL', value: 10 }
            ]
        }
        this.renderActiveShape=this.renderActiveShape.bind(this);
        this.onPieEnter=this.onPieEnter.bind(this);

    }
    componentDidMount() {
        this.setState({spinnerCom:"d-block",review:""})
        Axios.get('/CountSummary').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,error:false})
                this.setState({spinnerCom:"d-none",
                    review:response.data['review'],
                    contact:response.data['contact'],
                    project:response.data['project'],
                    course:response.data['course'],
                    service:response.data['service']
                })
            }
            else{
                this.setState({spinnerCom:"d-block",error:true})
            }
        }).catch((error)=>{
            this.setState({error:true})
        })
    }
    renderActiveShape(props){
        const RADIAN = Math.PI / 180;
        const {
            cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill="#ffcc5c"
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill="#00539C"
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ff7300">{`Course Taken ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };
    onPieEnter(data, index){
        this.setState({
            activeIndex: index
        });
    };

    render() {

        if (this.state.error==true){
            return (
                <Menu>
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }
        else{
            const data = this.state.dataList;
            return (
                <Fragment>
                    <Menu title="Home">
                        <Container fluid={true} className="p-3">
                            <Row>
                                <Col lg={3} md={4} sm={6}>
                                    <div className="card-counter primary">
                                        <FontAwesomeIcon className="iconOpacity"  icon={faUserFriends} size="4x" />
                                        <span className="count-numbers"><Spinner className={this.state.spinnerCom}  animation="grow" />{this.state.review}</span>
                                        <span className="count-name">Client Review</span>
                                    </div>
                                </Col>
                                <Col lg={3} md={4} sm={6}>
                                    <div className="card-counter danger">
                                        <FontAwesomeIcon className="iconOpacity"  icon={faEnvelopeOpenText} size="4x" />
                                        <span className="count-numbers"><Spinner className={this.state.spinnerCom}  animation="grow" />{this.state.contact}</span>
                                        <span className="count-name">Contacts</span>
                                    </div>
                                </Col>
                                <Col lg={3} md={4} sm={6}>
                                    <div className="card-counter success">
                                        <FontAwesomeIcon className="iconOpacity"  icon={faBookReader} size="4x" />
                                        <span className="count-numbers"><Spinner className={this.state.spinnerCom}  animation="grow" />{this.state.course}</span>
                                        <span className="count-name">Courses</span>
                                    </div>
                                </Col>
                                <Col lg={3} md={4} sm={6}>
                                    <div className="card-counter warning">
                                        <FontAwesomeIcon className="iconOpacity"  icon={faServer} size="4x" />
                                        <span className="count-numbers"><Spinner className={this.state.spinnerCom}  animation="grow" />{this.state.service}</span>
                                        <span className="count-name">Services</span>
                                    </div>
                                </Col>
                                <Col lg={3} md={4} sm={6}>
                                    <div className="card-counter dark">
                                        <FontAwesomeIcon className="iconOpacity"  icon={faProjectDiagram} size="4x" />
                                        <span className="count-numbers"><Spinner className={this.state.spinnerCom}  animation="grow" />{this.state.project}</span>
                                        <span className="count-name">Projects</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-5 text-center fontAdminDash">
                                <Col lg={6} md={6} sm={6}>

                                </Col>
                                <Col lg={6} md={6} sm={6}>

                                </Col>
                            </Row>
                            <Row >
                                <Col style={{width:'200px', height:'450px'}} lg={6} md={12} sm={12} className="text-center">
                                    <ResponsiveContainer>
                                        <ComposedChart  className="" data={this.state.dataChart}>
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <XAxis dataKey="name"/>
                                            <YAxis/>
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" dataKey="amt" fill="rgba(75, 237, 149, 0.4)" stroke="#8884d8" />
                                            <Bar dataKey="pv" barSize={40} fill="rgba(255, 99, 71, 0.8)" />
                                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </Col>
                                <Col lg={6} md={12} sm={12} className="text-center">
                                    <ResponsiveContainer>
                                        <PieChart  className="circleChart">
                                            <Pie
                                                activeIndex={this.state.activeIndex}
                                                activeShape={this.renderActiveShape}
                                                data={this.state.dataCircle}
                                                cx={300}
                                                cy={200}
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#9B1B30"
                                                dataKey="value"
                                                onMouseEnter={this.onPieEnter}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Col>
                            </Row>
                        </Container>
                    </Menu>
                </Fragment>
            );
        }

    }
}

export default HomePage;
