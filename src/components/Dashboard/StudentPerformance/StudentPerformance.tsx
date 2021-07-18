import React from "react";
import "../../../app/App.scss";
import "./StudentPerformance.scss";
import { Container, Row, Col } from "react-bootstrap";
import {
  Divider,
  Text,
  Avatar,
  Accordion,
  List,
} from "@fluentui/react-northstar";
import { redirectToDashboard } from "../../../util/redirect";
import { SearchIcon, ChevronEndIcon } from "@fluentui/react-icons-northstar";
import { Pie } from "react-chartjs-2";
import Filter from "../HeaderComponents/Filter";
import InputFilter from "../HeaderComponents/InputFilter";

const state = {
  datasets: [
    {
      backgroundColor: ["#6264A7", "#C4314B", "#D9DBDB"],
      data: [73, 18, 9],
    },
  ],
};
const items = [
  { key: "1", header: "Batch 1" },
  { key: "2", header: "Batch 2" },
  { key: "3", header: "Batch 3" },
];
const panels = [
  {
    key: "chem",
    title: "Chemistry",
    content: <List items={items} selectable />,
  },
  {
    key: "phy",
    title: "Physics",
    content: <List items={items} selectable />,
  },
  {
    key: "math",
    title: "Mathematics",
    content: <List items={items} selectable />,
  },
];
const accord: { key: any; header: any }[] = [];

interface IStudentPerProps {
  classes: any;
}

class StudentPerformance extends React.Component<IStudentPerProps> {
  componentDidMount = async () => {
    await this.props.classes.map((cls: any) => {
      accord.push({
        key: cls.ClassId,
        header: cls.ClassName,
      });
    });
    console.log(accord);
  };

  render() {
    return (
      <div className="main-div2">
        <Container fluid>
          <Row className="fltr-bar-brdcrmb">
            <Col md={2} lg={2} xl={2}>
              <div className="per-brd">
                <Text className="txt" onClick={redirectToDashboard}>
                  Dashboard
                </Text>
                <ChevronEndIcon />
                <Text>Performance</Text>
              </div>
            </Col>
            <Col md={10} lg={10} xl={10} className="fltr-bar-brdcrmb-shadow">
              <InputFilter />
            </Col>
          </Row>
          <Row className="rw-hgt">
            <Col md={2} lg={2} xl={2} className="div-shadow">
              <Container className="top-mrgn">
                <Accordion panels={panels} className="accord" />
              </Container>
            </Col>

            <Col md={10} lg={10} xl={10}>
              <div className="per-padd">
                <Container fluid>
                  <Row className="per-cont-row-pdd">
                    <Col>
                      <Text className="per-head-txt">
                        Overall Performance:{" "}
                      </Text>
                      <Text className="per-hd-txt"> Batch 1</Text>
                    </Col>
                  </Row>
                  <Row className="per-cont-row-pdd">
                    <Col
                      md={5}
                      lg={5}
                      xl={5}
                      className={
                        window.innerWidth > 567 ? "crd card1-padd" : "crd"
                      }
                    >
                      <div>
                        <Text className="per-cont-head ">
                          Student Performance
                        </Text>
                        <Container fluid className="chart-pdd">
                          <Row>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                              <Pie
                                type={"pie"}
                                data={state}
                                width={100}
                                height={100}
                                options={{
                                  title: {
                                    display: true,
                                    text: "Average Rainfall per month",
                                    fontSize: 20,
                                  },
                                }}
                              />
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                              <div>
                                <Container fluid>
                                  <Row className="chart-lbl-row">
                                    <Col md={1} lg={1} xl={1}>
                                      <div className="lbl-wd-hgt label-1"></div>
                                    </Col>
                                    <Col>
                                      <Text className="lbl-txt-1">73%</Text>
                                      <br />
                                      <Text className="lbl-txt-2">
                                        Average Performers
                                      </Text>
                                    </Col>
                                  </Row>
                                  <Row className="chart-lbl-row">
                                    <Col md={1} lg={1} xl={1}>
                                      <div className="lbl-wd-hgt label-2"></div>
                                    </Col>
                                    <Col>
                                      <Text className="lbl-txt-1">18%</Text>
                                      <br />
                                      <Text className="lbl-txt-2">
                                        High Performers
                                      </Text>
                                    </Col>
                                  </Row>
                                  <Row className="chart-lbl-row">
                                    <Col md={1} lg={1} xl={1}>
                                      <div className=" lbl-wd-hgt label-3"></div>
                                    </Col>
                                    <Col>
                                      <Text className="lbl-txt-1">9%</Text>
                                      <br />
                                      <Text className="lbl-txt-2">
                                        Low Performers
                                      </Text>
                                    </Col>
                                  </Row>
                                </Container>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </Col>
                    <Col
                      className={
                        window.innerWidth > 567
                          ? "crd card2-padd"
                          : "crd mob-padd"
                      }
                    >
                      <div>
                        <Text className="per-cont-head">
                          Assignments Uploaded
                        </Text>
                        <Container className="uploaded-tbl">
                          <Row className="uploaded-tbl-header">
                            <Col>Course Code</Col>
                            <Col>Course Title</Col>
                            <Col>Date</Col>
                            <Col>Grand Total</Col>
                            <Col>Class Average</Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Col>Course101</Col>
                            <Col>Quiz 1</Col>
                            <Col>June 31, 2021</Col>
                            <Col>41</Col>
                            <Col>30</Col>
                          </Row>
                          <Divider />
                          <Row>
                            <Col>Course101</Col>
                            <Col>Quiz 2</Col>
                            <Col>June 31, 2021</Col>
                            <Col>38</Col>
                            <Col>35</Col>
                          </Row>
                          <Divider />
                        </Container>
                      </div>
                    </Col>
                  </Row>
                  <Row className={window.innerWidth < 567 ? "crd" : ""}>
                    <Col>
                      <div
                        className={
                          window.innerWidth >= 567 ? "crd padd-inline" : ""
                        }
                      >
                        <Text className="per-cont-head"> Top Performers</Text>
                        <Container fluid className="table-pdd">
                          <Row className="table-row-pdd table-hd-txt ">
                            <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                              <Text>Student Name</Text>
                            </Col>
                            <Col>
                              <Text>Overall grade</Text>
                            </Col>
                            <Col>
                              <Text>Net score</Text>
                            </Col>
                          </Row>
                          <Divider />
                          <Row className="table-row-pdd ">
                            <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                              <Avatar name="Shruti Mhatre" />
                              <Text className="tbl-txt-name ">
                                Shruti Mhatre
                              </Text>
                            </Col>
                            <Col>
                              <Text className="txt-cntr">A</Text>
                            </Col>
                            <Col>
                              <Text>100</Text>
                            </Col>
                          </Row>
                          <Divider />
                        </Container>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StudentPerformance;
