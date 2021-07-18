import React from "react";
import "../../../app/App.scss";
import "./Grades.scss";
import { Divider, Text, Loader, List } from "@fluentui/react-northstar";
import { ChevronEndIcon } from "@fluentui/react-icons-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { redirectToDashboard } from "../../../util/redirect";
import { getGradesView } from "../../../apis/api";
import InputFilter from "../HeaderComponents/InputFilter";

interface IGradeProps {
  screen: string;
  classes: any;
  onHandleScreen: any;
}
interface IGrades {
  selectedIndex: any;
  setClasses: boolean;
  selectedClass: any;
  grades: any;
  isLoaded: boolean;
}
const items: { key: any; header: any }[] = [];

const grades = [
  {
    Points: "80",
    Status: "Submitted",
    SubmittedBy: "7af88d5d-f1cf-4972-8fab-55bc97ae9157",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Assignment",
    AssignmentId: "19870de9-e856-40a7-a442-aed9c7cd7546",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "50",
    Status: "Submitted",
    SubmittedBy: "5b606102-28a9-4d02-8e09-dde7d99aa64d",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Assignment",
    AssignmentId: "19870de9-e856-40a7-a442-aed9c7cd7546",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "",
    Status: "Submitted",
    SubmittedBy: "7af88d5d-f1cf-4972-8fab-55bc97ae9157",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Quiz",
    AssignmentId: "af563eda-f110-4266-b512-d1b1ba42dd6e",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "",
    Status: "Not Submitted",
    SubmittedBy: "5b606102-28a9-4d02-8e09-dde7d99aa64d",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Quiz",
    AssignmentId: "af563eda-f110-4266-b512-d1b1ba42dd6e",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "",
    Status: "Not Submitted",
    SubmittedBy: "5b606102-28a9-4d02-8e09-dde7d99aa64d",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Assignment 2",
    AssignmentId: "34e06cf8-ab7a-41b4-889d-ff77cfd29775",
    DueDateTime: "2021-05-22T19:59:00",
  },
  {
    Points: "",
    Status: "Not Submitted",
    SubmittedBy: "7af88d5d-f1cf-4972-8fab-55bc97ae9157",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Assignment 2",
    AssignmentId: "34e06cf8-ab7a-41b4-889d-ff77cfd29775",
    DueDateTime: "2021-05-22T19:59:00",
  },
];

const gradesNew = [
  {
    Points: "80",
    Status: "Submitted",
    SubmittedBy: "7af88d5d-f1cf-4972-8fab-55bc97ae9157",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "new 23612",
    AssignmentId: "19870de9-e856-40a7-a442-aed9c7cd7546",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "50",
    Status: "Submitted",
    SubmittedBy: "5b606102-28a9-4d02-8e09-dde7d99aa64d",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Assignment 21133",
    AssignmentId: "19870de9-e856-40a7-a442-aed9c7cd7546",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "54",
    Status: "Submitted",
    SubmittedBy: "7af88d5d-f1cf-4972-8fab-55bc97ae9157",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Quiz",
    AssignmentId: "af563eda-f110-4266-b512-d1b1ba42dd6e",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "97",
    Status: "Not Submitted",
    SubmittedBy: "5b606102-28a9-4d02-8e09-dde7d99aa64d",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Test Quiz 2323",
    AssignmentId: "af563eda-f110-4266-b512-d1b1ba42dd6e",
    DueDateTime: "2021-05-11T19:59:00",
  },
  {
    Points: "45",
    Status: "Not Submitted",
    SubmittedBy: "5b606102-28a9-4d02-8e09-dde7d99aa64d",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: "Assignment 97886",
    AssignmentId: "34e06cf8-ab7a-41b4-889d-ff77cfd29775",
    DueDateTime: "2021-05-22T19:59:00",
  },
  {
    Points: "32",
    Status: "Not Submitted",
    SubmittedBy: "7af88d5d-f1cf-4972-8fab-55bc97ae9157",
    ClassId: "281ce952-10af-45a7-bb84-5218b563a80f",
    AssignmentName: " 2323 Assignment 2",
    AssignmentId: "34e06cf8-ab7a-41b4-889d-ff77cfd29775",
    DueDateTime: "2021-05-22T19:59:00",
  },
];

class Grades extends React.Component<IGradeProps, IGrades> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedIndex: 0,
      setClasses: false,
      selectedClass: this.props.classes[0].ClassId,
      grades: [],
      isLoaded: false,
    };
  }
  componentDidMount = async () => {
    //console.log(this.props.classes);
    await this.props.classes.map(this.getClassNames);
    this.setState({ setClasses: true });
    // await this.getClassGrades("dashboard", this.state.selectedClass);
    this.setState({ grades: grades, isLoaded: true });
  };

  getClassNames = (val: any) => {
    items.push({ key: val.ClassId, header: val.ClassName });
  };

  getClassGrades = (source: string, classId: string) => {
    getGradesView(source, classId)
      .then(async (gradesResponse) => {
        if (gradesResponse.status === 200) {
          this.setState({
            grades: gradesResponse.data.ResultData,
            isLoaded: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  getGradeTableRows = (val: any, id: number) => {
    return (
      <>
        <Row className="grd-tbl-row">
          <Col>
            <Text>{id + 1}</Text>
          </Col>
          <Col>
            <Text>{val.AssignmentName}</Text>
          </Col>
          <Col>
            <Text>{val.Points}</Text>
          </Col>

          <Col>
            <Text
              className={
                val.Status === "Submitted" ? "subm-status" : "not-subm-status"
              }
            >
              {val.Status}
            </Text>
          </Col>
        </Row>

        <Row>
          <Col>
            <Divider />
          </Col>
        </Row>
      </>
    );
  };

  render() {
    if (this.state.isLoaded === true) {
      return (
        <div className="main-div">
          <Container fluid>
            <Row>
              <Col style={{ fontWeight: "bold" }}>
                <Text
                  className="txt"
                  onClick={() => this.props.onHandleScreen(null)}
                >
                  Dashboard
                </Text>
                <ChevronEndIcon />
                <Text>Grades</Text>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={10}
                lg={10}
                xl={10}
                className="fltr-bar-brdcrmb-shadow"
              >
                <div>
                  <InputFilter />
                </div>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row className="rw-hgt">
              <Col xs={12} sm={12} md={2} lg={2} xl={2} className="div-shadow ">
                <List
                  className="list-classes"
                  selectable
                  onSelectedIndexChange={async (e, newProps: any) => {
                    await this.setState({
                      selectedIndex: newProps.selectedIndex,
                      selectedClass: newProps.items[newProps.selectedIndex].key,
                    });

                    //this.getClassGrades("dashboard", this.state.selectedClass);
                    this.setState({ grades: gradesNew });
                  }}
                  items={items}
                  selectedIndex={this.state.selectedIndex}
                  // horizontal={window.innerWidth < 567 ? true : false}
                />
              </Col>

              <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                <div
                  className={window.innerWidth > 567 ? "crd grd-card" : "crd"}
                >
                  <Container className="grd-table">
                    <Row className="grd-tbl-row  grd-tbl-hd">
                      <Col>
                        <Text>S.I. No.</Text>
                      </Col>
                      <Col>
                        <Text>Assignment</Text>
                      </Col>
                      <Col>
                        <Text>Marks</Text>
                      </Col>

                      <Col>
                        <Text>Status</Text>
                      </Col>
                    </Row>
                    {this.state.grades.map(this.getGradeTableRows)}
                  </Container>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default Grades;
