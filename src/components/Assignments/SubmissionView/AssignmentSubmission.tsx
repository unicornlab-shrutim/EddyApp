import React from "react";
import "../../../app/App.scss";
import "./AssignmentSubmission.scss";
import {
  Text,
  Input,
  Avatar,
  Button,
  Divider,
  Flex,
  FlexItem,
  ChevronEndIcon,
  SearchIcon,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { redirectToAssignments, openSubmission } from "../../../util/redirect";
import { Bar } from "react-chartjs-2";
import InputFilter from "../../Dashboard/HeaderComponents/InputFilter";

interface ISubmissionInfo {
  submitted: boolean;
}

const data = {
  labels: [""],
  datasets: [
    {
      label: "Submitted",
      data: [100],
      backgroundColor: "#6264a7",
      barThickness: 20,
    },
    {
      label: "Not submitted",
      data: [60],
      backgroundColor: "#c4314b",
      barThickness: 20,
    },
  ],
};
const optns = {
  indexAxis: "y",

  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

class AssignmentSubmission extends React.Component<{}, ISubmissionInfo> {
  constructor(props: any) {
    super(props);
    this.state = {
      submitted: true,
    };
  }

  onClickTab = () => {
    this.setState({ submitted: !this.state.submitted });
  };

  render() {
    let tab1 = this.state.submitted ? "selected-tab" : "not-selected-tab";
    let tab2 = this.state.submitted ? "not-selected-tab" : "selected-tab";
    return (
      <div className="main-div2">
        <div className="fltr-bar">
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div style={{ fontWeight: "bold" }}>
                  <Text className="txt" onClick={redirectToAssignments}>
                    Assignments
                  </Text>
                  <ChevronEndIcon />
                  <Text className="txt">Submissions View</Text>
                  <ChevronEndIcon />
                  <Text>Assignment Submissions</Text>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <InputFilter />
              </Col>
            </Row>
          </Container>
        </div>
        <div
          className={
            window.innerWidth > 567 ? "crd submsn-mrgn" : "crd sbmsn-mob-padd"
          }
        >
          <Container fluid className="submsn-pdd">
            <Row>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Text className="submsn-heading">Assignment Submissions</Text>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="srch-std">
                  <input
                    placeholder="Search students"
                    className="filtr-input std-filtr"
                  />
                  <SearchIcon />
                </div>
              </Col>
            </Row>
            <Row className="bar-row-pdd">
              <Col>
                <Text className="bar-lbl-txt"> Feb 1, 2021 11:59 am </Text>
              </Col>
            </Row>
            <Row className="bar-row-pdd">
              <Bar
                type="bar"
                data={data}
                options={optns}
                height={window.innerWidth > 567 ? 30 : 40}
              />
            </Row>

            <Row className="bar-row-pdd">
              <Flex gap="gap.large">
                <Flex gap="gap.small">
                  <div className="bar-label bar-sbmtd"></div>
                  <Text className="bar-lbl-txt">Submitted</Text>
                </Flex>
                <Flex gap="gap.small">
                  <div className="bar-label  bar-nt-sbtdl"></div>
                  <Text className="bar-lbl-txt">Not submitted</Text>
                </Flex>
              </Flex>
            </Row>
            <Row className="submissions-tab">
              <Flex gap="gap.medium">
                <Text className={tab1} onClick={this.onClickTab}>
                  Submitted
                </Text>
                <Text className={tab2} onClick={this.onClickTab}>
                  Not Submitted
                </Text>
              </Flex>
            </Row>
            <Row>
              <Col md={10} lg={10} xl={10}>
                {this.state.submitted && (
                  <>
                    <Container fluid className="submissions-table">
                      <Row className="submissions-table-header">
                        <Col>
                          <Text>Student name</Text>
                        </Col>
                        <Col>
                          <Text>View Assignment</Text>
                        </Col>
                        <Col>
                          <Text>Marks</Text>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col>
                          <Avatar name="Roy Appleton" />
                          <Text className="subsn-table-name">Roy Appleton</Text>
                        </Col>
                        <Col>
                          <Button content="View" size="small" primary />
                        </Col>
                        <Col>
                          <Text>80</Text>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col>
                          <Avatar name="Jack Sparrow" />
                          <Text className="subsn-table-name">Jack Sparrow</Text>
                        </Col>
                        <Col>
                          <Button content="View" size="small" primary />
                        </Col>
                        <Col>
                          <Text>65</Text>
                        </Col>
                      </Row>
                      <Divider />
                    </Container>
                  </>
                )}
                {!this.state.submitted && (
                  <>
                    <Container className="submissions-table">
                      <Row className="submissions-table-header">
                        <Col>
                          <Text>Student name</Text>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col>
                          <Avatar name="Shruti Mhatre" />
                          <Text className="subsn-table-name">
                            Shruti Mhatre
                          </Text>
                        </Col>
                      </Row>
                      <Divider />
                      <Row>
                        <Col>
                          <Avatar name="Hilary Reyes" />
                          <Text className="subsn-table-name">Hilary Reyes</Text>
                        </Col>
                      </Row>
                      <Divider />
                    </Container>
                  </>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AssignmentSubmission;
