import React from "react";
import "./AssignmentsList.scss";
import assignnment from "../../../images/assignments.svg";
import {
  Image,
  Text,
  Flex,
  FlexItem,
  Loader,
  ChevronDownIcon,
  ChevronEndIcon,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { openAssignment } from "../../../util/redirect";
import { getAllAssignments } from "../../../apis/api";
import { dateTOAMORPM, monthShortNames } from "../../../util/lib";

interface IAssignmentsList {
  pending: boolean;
  completed: boolean;
  plannedAssignments: [];
  completedAssignments: [];
  isLoaded: boolean;
  isPlanned: boolean;
  isCompleted: boolean;
}
interface IAssignListProps {
  classes: [];
}

export default class AssignmentsList extends React.Component<
  IAssignListProps,
  IAssignmentsList
> {
  constructor(props: any) {
    super(props);
    this.state = {
      pending: true,
      completed: false,
      plannedAssignments: [],
      completedAssignments: [],
      isLoaded: false,
      isPlanned: false,
      isCompleted: false,
    };
  }

  componentDidMount = async () => {
    await this.loadAllAssignmants("assignments");
  };

  loadAllAssignmants = async (source: string) => {
    getAllAssignments(source)
      .then(async (assignmentList) => {
        if (assignmentList.status === 200) {
          await this.setState({
            plannedAssignments: assignmentList.data.ResultData.Planned,
            completedAssignments: assignmentList.data.ResultData.Completed,
            isLoaded: true,
          });
          if (this.state.plannedAssignments.length > 0) {
            this.setState({ isPlanned: true });
          } else {
            this.setState({ isPlanned: false });
          }
          if (this.state.completedAssignments.length > 0) {
            this.setState({ isCompleted: true });
          } else {
            this.setState({ isCompleted: false });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  mapClassName = (mapClass: any, cls: any) => {
    if (mapClass.ClassId === cls) {
      return mapClass.ClassName;
    }
  };
  getClassName = (classId: any) => {
    return this.props.classes.map((e) => this.mapClassName(e, classId));
  };

  getPlanned = (plannedAssignments: any) => {
    return (
      <>
        <Row
          className="assign-row"
          onClick={() => {
            openAssignment(
              plannedAssignments.ClassId,
              plannedAssignments.AssignmentId,
              false
            );
          }}
        >
          <Col lg={12}>
            <Container fluid>
              <Row>
                <Col lg={12}>
                  <Text className="asgn-name">
                    {plannedAssignments.AssignmentName}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Text className="assgn-subj">
                    {this.getClassName(plannedAssignments.ClassId)}
                  </Text>
                </Col>
                <Col lg={6}>
                  <Text className="timestp">
                    Due{" "}
                    {
                      monthShortNames[
                        new Date(plannedAssignments.DueDateTime).getMonth()
                      ]
                    }{" "}
                    {new Date(plannedAssignments.DueDateTime).getDate()}{" "}
                    {dateTOAMORPM(new Date(plannedAssignments.DueDateTime))}
                  </Text>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </>
    );
  };

  getCompleted = (completedAssignments: any) => {
    return (
      <>
        <Row
          className="assign-row"
          onClick={() => {
            openAssignment(
              completedAssignments.ClassId,
              completedAssignments.AssignmentId,
              true
            );
          }}
        >
          <Col lg={12}>
            <Container fluid>
              <Row>
                <Col lg={12}>
                  <Text className="asgn-name">
                    {completedAssignments.AssignmentName}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <Text className="assgn-subj">
                    {" "}
                    {this.getClassName(completedAssignments.ClassId)}
                  </Text>
                </Col>
                <Col lg={6}>
                  <Text className="tmstmp-cmpltd">
                    Due{" "}
                    {
                      monthShortNames[
                        new Date(completedAssignments.DueDateTime).getMonth()
                      ]
                    }{" "}
                    {new Date(completedAssignments.DueDateTime).getDate()}{" "}
                    {dateTOAMORPM(new Date(completedAssignments.DueDateTime))}
                  </Text>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </>
    );
  };

  switchPending = () => {
    this.setState({ pending: !this.state.pending });
  };

  switchCompleted = () => {
    this.setState({ completed: !this.state.completed });
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="crsr">
          <div>
            <div>
              {this.state.pending && (
                <ChevronDownIcon
                  className="icon-arr"
                  onClick={this.switchPending}
                />
              )}
              {!this.state.pending && (
                <ChevronEndIcon
                  className="icon-arr"
                  onClick={this.switchPending}
                />
              )}
              <Text className="pdd" onClick={this.switchPending}>
                Pending
              </Text>
            </div>

            {this.state.pending && this.state.isPlanned && (
              <div className="assgn-list">
                <Container fluid>
                  {this.state.plannedAssignments.map(this.getPlanned)}
                </Container>
              </div>
            )}
            {this.state.pending && !this.state.isPlanned && (
              <div>
                <div className="algn-center">
                  <Image
                    src={assignnment}
                    alt="assignment"
                    className="img-padding"
                  />
                  <br />
                  <Text className="txt-hd">
                    You've completed all assignments
                  </Text>
                  <br />
                  <Text className="txt-sub">Take a break</Text>
                </div>
              </div>
            )}
          </div>
          <div>
            <div>
              {this.state.completed && (
                <ChevronDownIcon
                  className="icon-arr"
                  onClick={this.switchCompleted}
                />
              )}
              {!this.state.completed && (
                <ChevronEndIcon
                  className="icon-arr"
                  onClick={this.switchCompleted}
                />
              )}
              <Text className="pdd" onClick={this.switchCompleted}>
                Completed
              </Text>
            </div>
            {this.state.completed && this.state.isCompleted && (
              <div className="assgn-list">
                <Container fluid>
                  {this.state.completedAssignments.map(this.getCompleted)}
                </Container>
              </div>
            )}
            {this.state.completed && !this.state.isCompleted && (
              <div>
                <div className="algn-center">
                  <Image
                    src={assignnment}
                    alt="assignment"
                    className="img-padding"
                  />
                  <br />
                  <Text className="txt-hd">
                    You've have not completed any assignments
                  </Text>
                  <br />
                  <Text className="txt-sub">Check for pending assignments</Text>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
