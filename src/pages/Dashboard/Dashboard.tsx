import React from "react";
import "./Dashboard.scss";
import "../../app/App.scss";
import axios from "../../apis/axoisJWTDecorator";
import {
  Text,
  Checkbox,
  Image,
  Loader,
  Flex,
  FlexItem,
  Avatar,
  SearchIcon,
  ArrowRightIcon,
  ChevronEndMediumIcon,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import board from "../../images/Board.png";
import grade from "../../images/assign.png";
import calender from "../../images/calender.png";
import create from "../../images/create.png";
import { goToAssignmentsTab } from "../../util/redirect";
import Grades from "../../components/Dashboard/Grades/Grades";
import Calendar from "../../components/Dashboard/CalenderView/CalenderView";
import StudentPerformance from "../../components/Dashboard/StudentPerformance/StudentPerformance";
import CreateAssignment from "../../components/Assignments/CreateAssignment/CreateAssignment";
import Activity from "../../components/Dashboard/Activity/Activity";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pie } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { getAppSettings, getMyClasses } from "../../apis/api.js";
import InputFilter from "../../components/Dashboard/HeaderComponents/InputFilter";
import Filter from "../../components/Dashboard/HeaderComponents/Filter";
import * as microsoftTeams from "@microsoft/teams-js";

const state = {
  datasets: [
    {
      backgroundColor: ["#6967E4", "#C43F57", "#F9BD86"],
      hoverBackgroundColor: ["#6967E4", "#C43F57", "#F9BD86"],
      data: [73, 18, 9],
    },
  ],
  options: { maintainAspectRatio: false },
};
const dataAssignments = {
  datasets: [
    {
      data: [145, 34],
      backgroundColor: ["#666DE1", "#F9865B"],
      hoverBackgroundColor: ["#666DE1", "#F9865B"],
    },
  ],
  options: {
    rotation: 270,
    circumference: 180,
    tooltip: {
      enabled: false,
    },
    maintainAspectRatio: false,
  },
};

const dataAssessments = {
  datasets: [
    {
      data: [260, 80],
      backgroundColor: ["#4F956F", "#FFD280"],
      hoverBackgroundColor: ["#4F956F", "#FFD280"],
    },
  ],
  options: {
    rotation: 270,
    circumference: 180,
    tooltip: {
      enabled: false,
    },
    maintainAspectRatio: false,
  },
};

interface IDashboard {
  toggleAdmin: boolean;
  switchScreen: any;
  isAppSettingsLoaded: boolean;
  myClasses: [];
}

class Dashboard extends React.Component<{}, IDashboard> {
  constructor(props: any) {
    super(props);
    this.state = {
      toggleAdmin: false,
      switchScreen: null,
      isAppSettingsLoaded: false,
      myClasses: [],
    };
  }

  componentDidMount = async () => {
    await this.loadAppSettings("dashboard");
    this.loadMyClasses("dashboard");
  };

  loadAppSettings = async (source: string) => {
    getAppSettings(source)
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem(
            "UserRole",
            response.data.ResultData.PrimaryRole
          );
          localStorage.setItem(
            "UserName",
            response.data.ResultData.DisplayName
          );
          this.setState({ isAppSettingsLoaded: true });
        }
      })
      .catch((error) => {
        console.log(error);
        axios.handleError(error);
      });
  };

  loadMyClasses = async (source: string) => {
    getMyClasses(source)
      .then(async (classResponse) => {
        console.log(classResponse);
        if (classResponse.status === 200) {
          this.setState({
            myClasses: classResponse.data.ResultData,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        axios.handleError(error);
      });
  };

  handlescreen = (screen: any) => {
    this.setState({ switchScreen: screen });
  };

  render() {
    if (this.state.isAppSettingsLoaded === true) {
      if (localStorage.getItem("UserRole") === "student") {
        return (
          <div className="dash">
            {this.state.switchScreen === null && (
              <Container fluid>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="header">
                      <Text className="aln">
                        Hello {localStorage.getItem("UserName")}
                      </Text>
                      <br />
                      <Text className="upper">
                        {localStorage.getItem("UserRole")} dashboard
                      </Text>
                    </div>
                  </Col>
                </Row>
              </Container>
            )}

            {/* this.state.switchScreen !== null && (
              <Container fluid>
                <Row>
                  <Col>
                    <div className="dash-brdcrmb">
                      <Text
                        className="redirct-brdcrmb"
                        onClick={() => {
                          this.setState({ switchScreen: null });
                        }}
                      >
                        Dashboard
                      </Text>
                      <ChevronEndMediumIcon />
                      {this.state.switchScreen === "viewGrades" && (
                        <Text>Grades</Text>
                      )}
                      {this.state.switchScreen === "calendar" && (
                        <Text>Calendar</Text>
                      )}
                    </div>
                  </Col>
                  <Col xs={4} sm={4} md={1} lg={1} xl={1}>
                    <Filter classData={this.state.myClasses} />
                  </Col>
                  <Col xs={4} sm={4} md={3} lg={3} xl={3}>
                    <InputFilter />
                  </Col>
                </Row>
              </Container>
                      ) */}

            {this.state.switchScreen === null && (
              <Container className="act" fluid>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={8}>
                    <div className="left">
                      <div>
                        <Activity classes={this.state.myClasses} />
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4}>
                    <div className="right">
                      <div className="card">
                        <div className="bckgrnd">
                          <div
                            className="bdr asgn"
                            id="assignmentsTabStudent"
                            onClick={goToAssignmentsTab}
                          >
                            <div className="spc">
                              <Flex gap="gap.medium">
                                <Image src={board} alt="board" />
                                <a>
                                  <Text className="button-font view-txt-clr">
                                    View Assignments
                                  </Text>
                                </a>
                                <Flex.Item push>
                                  <ArrowRightIcon
                                    size="large"
                                    className="icn-clr"
                                  ></ArrowRightIcon>
                                </Flex.Item>
                              </Flex>
                            </div>
                          </div>
                          <div
                            className="bdr grds"
                            id="grades"
                            onClick={() => {
                              this.setState({ switchScreen: "viewGrades" });
                            }}
                          >
                            <div className="spc">
                              <Flex gap="gap.medium">
                                <Image src={grade} alt="grades" />
                                <Text className="button-font view-txt-clr">
                                  View Marks
                                </Text>
                                <Flex.Item push>
                                  <ArrowRightIcon
                                    size="large"
                                    className="icn-clr"
                                  ></ArrowRightIcon>
                                </Flex.Item>
                              </Flex>
                            </div>
                          </div>
                          <div
                            className="bdr cal"
                            id="calendar"
                            onClick={() => {
                              this.setState({ switchScreen: "calendar" });
                            }}
                          >
                            <div className="spc">
                              <Flex gap="gap.medium">
                                <Image src={calender} alt="calender" />
                                <Text className="button-font view-txt-clr">
                                  View Calendar
                                </Text>
                                <Flex.Item push>
                                  <ArrowRightIcon
                                    size="large"
                                    className="icn-clr"
                                  ></ArrowRightIcon>
                                </Flex.Item>
                              </Flex>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
            {this.state.switchScreen === "viewGrades" && (
              <>
                <Grades
                  screen={this.state.switchScreen}
                  classes={this.state.myClasses}
                  onHandleScreen={this.handlescreen}
                />
              </>
            )}
            {this.state.switchScreen === "calendar" && (
              <>
                <Calendar
                  onHandleScreen={this.handlescreen}
                  screen={this.state.switchScreen}
                  classes={this.state.myClasses}
                />
              </>
            )}
          </div>
        );
      }

      if (localStorage.getItem("UserRole") === "faculty") {
        if (this.state.switchScreen === null) {
          return (
            <>
              <div className="dash">
                <>
                  <Container fluid>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="header">
                          <Text className="aln">
                            Hello {localStorage.getItem("UserName")}
                          </Text>
                          <br />

                          <Text className="upper">teacher dashboard</Text>
                        </div>
                      </Col>
                    </Row>
                  </Container>

                  <Container className="act" fluid>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={8}>
                        <div className="left">
                          <div>
                            <Activity classes={this.state.myClasses} />
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={4}>
                        <div className="right">
                          <div className="crd">
                            <div className="bckgrnd">
                              <div
                                className="bdr asgn"
                                id="assignmentsTabTeacher"
                                onClick={goToAssignmentsTab}
                              >
                                <div className="spc">
                                  <Flex gap="gap.medium">
                                    <Image src={board} alt="board" />
                                    <Text className="button-font view-txt-clr">
                                      View Submissions
                                    </Text>
                                    <Flex.Item push>
                                      <ArrowRightIcon
                                        size="large"
                                        className="icn-clr"
                                      ></ArrowRightIcon>
                                    </Flex.Item>
                                  </Flex>
                                </div>
                              </div>
                              <div
                                className="bdr grds"
                                id="studentPerformance"
                                onClick={() => {
                                  this.setState({
                                    switchScreen: "studentPerformance",
                                  });
                                }}
                              >
                                <div className="spc-std-per">
                                  <Flex gap="gap.medium">
                                    <Image src={grade} alt="grades" />

                                    <Text className="button-font view-txt-clr ">
                                      View Student Performance
                                    </Text>
                                    <Flex.Item push>
                                      <ArrowRightIcon
                                        size="large"
                                        className="icn-clr"
                                      ></ArrowRightIcon>
                                    </Flex.Item>
                                  </Flex>
                                </div>
                              </div>
                              <div
                                className="bdr cal"
                                id="createAssignment"
                                onClick={() => {
                                  this.setState({
                                    switchScreen: "createAssignments",
                                  });
                                }}
                              >
                                <div className="spc">
                                  <Flex gap="gap.medium">
                                    <Image src={create} alt="create" />
                                    <Text className="button-font view-txt-clr">
                                      Create Assignments
                                    </Text>
                                    <Flex.Item push>
                                      <ArrowRightIcon
                                        size="large"
                                        className="icn-clr"
                                      ></ArrowRightIcon>
                                    </Flex.Item>
                                  </Flex>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </>
              </div>
            </>
          );
        }
        if (this.state.switchScreen === "studentPerformance") {
          return (
            <>
              <StudentPerformance classes={this.state.myClasses} />
            </>
          );
        }
        if (this.state.switchScreen === "createAssignments") {
          return (
            <>
              <CreateAssignment classes={this.state.myClasses} />
            </>
          );
        }
      }
      if (localStorage.getItem("UserRole") === "admin") {
        return (
          <>
            <div className="dash">
              <Container fluid>
                <Row>
                  <Col className="admin-fltr-bar">
                    <div className="admin-search srch-flt-right">
                      <input placeholder="Find" className="filtr-input" />
                      <SearchIcon />
                    </div>
                  </Col>
                </Row>
                <Row className="admn-crds-pdd">
                  <Col>
                    <Container className="crd admin-grph">
                      <Row>
                        <Text className="crd-hdr">Assignments</Text>
                      </Row>
                      <Row>
                        <Container>
                          <Row className="gauge-row">
                            <Col>
                              <div>
                                <div className="gauge-chart-size">
                                  <Doughnut
                                    data={dataAssignments}
                                    options={dataAssignments.options}
                                    type="doughnut"
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col>
                              <Container>
                                <Row className="lbl-set-row">
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <div className="lbl1 lbl-wd-ht"></div>
                                  </Col>
                                  <Col>
                                    <Container>
                                      <Row>
                                        <Text className="lbl-hd">145</Text>
                                      </Row>
                                      <Row>
                                        <Text className="lbl-txt">
                                          Completed
                                        </Text>
                                      </Row>
                                    </Container>
                                  </Col>
                                </Row>
                                <Row className="lbl-set-row">
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <div className="lbl4 lbl-wd-ht"></div>
                                  </Col>
                                  <Col>
                                    <Container>
                                      <Row>
                                        <Text className="lbl-hd">34</Text>
                                      </Row>
                                      <Row>
                                        <Text className="lbl-txt">
                                          In-progress
                                        </Text>
                                      </Row>
                                    </Container>
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                      <Row>
                        <Text className="crd-hdr">Assessments</Text>
                      </Row>
                      <Row>
                        <Container>
                          <Row className="gauge-row">
                            <Col>
                              <div className="gauge-chart-size">
                                <Doughnut
                                  data={dataAssessments}
                                  options={dataAssessments.options}
                                  type="doughnut"
                                />
                              </div>
                            </Col>
                            <Col>
                              <Container>
                                <Row className="lbl-set-row">
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <div className="lbl5 lbl-wd-ht"></div>
                                  </Col>
                                  <Col>
                                    <Container>
                                      <Row>
                                        <Text className="lbl-hd">260</Text>
                                      </Row>
                                      <Row>
                                        <Text className="lbl-txt">
                                          Completed
                                        </Text>
                                      </Row>
                                    </Container>
                                  </Col>
                                </Row>
                                <Row className="lbl-set-row">
                                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                    <div className="lbl6 lbl-wd-ht"></div>
                                  </Col>
                                  <Col>
                                    <Container>
                                      <Row>
                                        <Text className="lbl-hd">80</Text>
                                      </Row>
                                      <Row>
                                        <Text className="lbl-txt">
                                          In-progress
                                        </Text>
                                      </Row>
                                    </Container>
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container fluid>
                      <Row className="crd admn-crd-row">
                        <Container fluid className="admin-crds-std">
                          <Row>
                            <Text className="crd-hdr">Student performance</Text>
                          </Row>
                          <Row>
                            <Container fluid>
                              <Row>
                                <Col>
                                  <div className="pie-size">
                                    <Pie
                                      type={"pie"}
                                      data={state}
                                      options={{
                                        title: {
                                          display: true,

                                          fontSize: 20,
                                        },
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col>
                                  <div className="lbl-set">
                                    <Container fluid>
                                      <Row className="lbl-set-row">
                                        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                          <div className="lbl1 lbl-wd-ht"></div>
                                        </Col>
                                        <Col>
                                          <Container>
                                            <Row>
                                              <Text className="lbl-hd">
                                                73%
                                              </Text>
                                            </Row>
                                            <Row>
                                              <Text className="lbl-txt">
                                                Average
                                              </Text>
                                            </Row>
                                          </Container>
                                        </Col>
                                      </Row>
                                      <Row className="lbl-set-row">
                                        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                          <div className="lbl2 lbl-wd-ht"></div>
                                        </Col>
                                        <Col>
                                          <Container>
                                            <Row>
                                              <Text className="lbl-hd">
                                                18%
                                              </Text>
                                            </Row>
                                            <Row>
                                              <Text className="lbl-txt">
                                                Below-average
                                              </Text>
                                            </Row>
                                          </Container>
                                        </Col>
                                      </Row>
                                      <Row className="lbl-set-row">
                                        <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                                          <div className="lbl3 lbl-wd-ht"></div>
                                        </Col>
                                        <Col>
                                          <Container>
                                            <Row>
                                              <Text className="lbl-hd">9%</Text>
                                            </Row>
                                            <Row>
                                              <Text className="lbl-txt">
                                                Above-average
                                              </Text>
                                            </Row>
                                          </Container>
                                        </Col>
                                      </Row>
                                    </Container>
                                  </div>
                                </Col>
                              </Row>
                            </Container>
                          </Row>
                        </Container>
                      </Row>
                      <Row className="crd">
                        <Container fluid className="admin-crds-std">
                          <Row>
                            <Text className="crd-hdr">
                              Top performing students
                            </Text>
                          </Row>
                          <Row>
                            <Container className="adm-top">
                              <Row
                                style={{
                                  fontWeight: "bold",
                                  padding: "5px",
                                }}
                              >
                                <Col>
                                  <Text>Student name</Text>
                                </Col>
                                <Col>
                                  <Text>Score</Text>
                                </Col>
                              </Row>

                              <Row style={{ padding: "5px" }}>
                                <Col>
                                  <Avatar
                                    name="Cecil Folk"
                                    className="avatar-table"
                                  />
                                  <Text>Cecil Folk</Text>
                                </Col>
                                <Col>
                                  <Text>70</Text>
                                </Col>
                              </Row>

                              <Row style={{ padding: "5px" }}>
                                <Col>
                                  <Avatar
                                    name="Hilary Reyes"
                                    className="avatar-table"
                                  />
                                  <Text>Hilary Reyes</Text>
                                </Col>
                                <Col>
                                  <Text>70</Text>
                                </Col>
                              </Row>
                            </Container>
                          </Row>
                          <Row className="adm-arr">
                            <ArrowRightIcon size="large" />
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        );
      } else {
        return (
          <div>
            <Text>Invalid User</Text>
          </div>
        );
      }
    } else {
      return (
        <div style={{ minHeight: "100vh" }}>
          <Loader label="Loading..." />
        </div>
      );
    }
  }
}

export default Dashboard;
