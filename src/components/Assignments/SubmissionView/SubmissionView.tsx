import React from "react";
import "./SubmissionView.scss";
import "../../../app/App.scss";
import {
  Text,
  Button,
  Flex,
  FlexItem,
  ChevronEndIcon,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { SearchIcon, ChevronDownIcon } from "@fluentui/react-icons-northstar";
import {
  redirectToAssignments,
  openAssignmentSubmission,
} from "../../../util/redirect";
import InputFilter from "../../Dashboard/HeaderComponents/InputFilter";

interface ISubmissionProps {
  classes: any;
}

interface ISubmissionView {
  classId: any;
  draft: boolean;
  assigned: boolean;
  draftAssignment: [];
  assignedAssignment: [];
}

export default class SubmissionView extends React.Component<
  ISubmissionProps,
  ISubmissionView
> {
  constructor(props: any) {
    super(props);
    this.state = {
      classId: this.props,
      draft: false,
      assigned: true,
      draftAssignment: [],
      assignedAssignment: [],
    };
  }
  componentDidMount() {
    console.log(this.props.classes);
    // console.log(this.state.classId.match.params.classId);
  }

  switchDraftIcon = () => {
    this.setState({ draft: !this.state.draft });
  };
  switchAssignedIcon = () => {
    this.setState({ assigned: !this.state.assigned });
  };

  render() {
    if (localStorage.getItem("UserRole") === "faculty") {
      return (
        <div className="main-div2 ">
          <div className="fltr-bar">
            <Container fluid>
              <Row>
                <Col xs={12} sm={12}>
                  <div className="brdcrmb">
                    <Text className="txt" onClick={redirectToAssignments}>
                      Assignments
                    </Text>
                    <ChevronEndIcon />
                    <Text>Inorganic I</Text>
                  </div>
                </Col>
                <Col>
                  <div>
                    <InputFilter />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="cont-div">
            <div className="assgn-cont-padd">
              {this.state.draft && (
                <ChevronDownIcon
                  className="icon-arr"
                  onClick={this.switchDraftIcon}
                />
              )}
              {!this.state.draft && (
                <ChevronEndIcon
                  className="icon-arr"
                  onClick={this.switchDraftIcon}
                />
              )}

              <Text className="pdd">Draft</Text>
              {this.state.draft && (
                <div className="teacher-list">
                  <Container fluid>
                    <Row className="draft-teacher-view ">
                      <Col>
                        <Container fluid>
                          <Row>
                            <Col>
                              <Text className="teacher-name">
                                Inorganic Quiz
                              </Text>
                            </Col>
                            <Col>
                              <Text className="teacher-name teacher-text-rgt">
                                Draft
                              </Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Text className="teacher-subj">Inorganic I</Text>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )}
            </div>
            <div className="assgn-cont-padd">
              {this.state.assigned && (
                <ChevronDownIcon
                  className="icon-arr"
                  onClick={this.switchAssignedIcon}
                />
              )}
              {!this.state.assigned && (
                <ChevronEndIcon
                  className="icon-arr"
                  onClick={this.switchAssignedIcon}
                />
              )}

              <Text className="pdd">Assigned</Text>
              {this.state.assigned && (
                <div className="teacher-list">
                  <Container fluid>
                    <Row
                      className="teacher-assigned-row"
                      onClick={() =>
                        openAssignmentSubmission(
                          this.state.classId.match.params.classId,
                          "someid"
                        )
                      }
                    >
                      <Container fluid>
                        <Row>
                          <Col>
                            <Text className="teacher-name">
                              Inorganic I Asignment
                            </Text>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Text className="teacher-subj">
                              Timestamp for assignment
                            </Text>
                          </Col>
                          <Col>
                            <Text className="teacher-subj teacher-text-rgt">
                              Date Submitted
                            </Text>
                          </Col>
                        </Row>
                      </Container>
                    </Row>
                  </Container>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}
