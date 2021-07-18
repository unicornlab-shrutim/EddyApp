import React from "react";
import "../../../app/App.scss";
import "./AssignmentView.scss";
import { Container, Row, Col } from "react-bootstrap";
import {
  Text,
  Button,
  Loader,
  Dialog,
  Flex,
  FlexItem,
  Carousel,
} from "@fluentui/react-northstar";
import {
  ChevronEndIcon,
  ChevronStartIcon,
  PaperclipIcon,
  AddIcon,
  TableIcon,
  CloseIcon,
  WordColorIcon,
  FilesPdfIcon,
  ExcelColorIcon,
  FilesTxtIcon,
  MoreIcon,
} from "@fluentui/react-icons-northstar";
import { redirectToAssignments } from "../../../util/redirect";
import { getAssignment, getFile } from "../../../apis/api";
import {
  monthFullNames,
  dateTOAMORPM,
  getFileExtension,
} from "../../../util/lib";
import { isThisTypeNode } from "typescript";

interface IAssignmentsView {
  assignmentID: any;
  assignment: any;
  isLoaded: boolean;
  setOPen: boolean;
  levels: any;
  qualities: any;
  points: string;
}
export default class AssignmentsView extends React.Component<
  {},
  IAssignmentsView
> {
  constructor(props: any) {
    super(props);
    this.state = {
      assignmentID: this.props,
      assignment: [],
      levels: [],
      qualities: [],
      isLoaded: false,
      setOPen: false,
      points: "",
    };
  }
  componentDidMount = async () => {
    console.log(this.state.assignmentID.match.params.isComplete);
    await this.loadAssignment(
      "assignments",
      this.state.assignmentID.match.params.classId,
      this.state.assignmentID.match.params.assignmentId
    );
  };

  loadAssignment = (source: string, classId: string, assignmentId: string) => {
    getAssignment(source, classId, assignmentId)
      .then(async (getAssgn) => {
        if (getAssgn.status === 200) {
          // console.log(getAssgn.data.ResultData);
          await this.setState({
            assignment: getAssgn.data.ResultData,

            isLoaded: true,
          });
          if (getAssgn.data.ResultData.Points) {
            this.setState({
              points: getAssgn.data.ResultData.Points,
            });
          }
          console.log(this.state.assignment);
          if (getAssgn.data.ResultData.AssignmentRubric.RubricId !== null) {
            await this.setState({
              levels: getAssgn.data.ResultData.AssignmentRubric.Levels,
              qualities: getAssgn.data.ResultData.AssignmentRubric.Qualities,
            });
            console.log(this.state.levels);
            console.log(this.state.qualities);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  getRubric = (val: any) => {
    return (
      <>
        <Row style={{ paddingTop: "20px", paddingBottom: "10px" }}>
          <Col>
            <Flex gap="gap.large">
              {" "}
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: 550,
                }}
              >
                {val.QualityDescription}
              </Text>
              <FlexItem push>
                <div>
                  {val.Weight !== null && (
                    <Text
                      style={{
                        fontSize: "12px",
                        color: "gray",
                        paddingTop: "20px",
                        paddingBottom: "5px",
                      }}
                    >
                      Weight {val.Weight}%
                    </Text>
                  )}
                </div>
              </FlexItem>
            </Flex>
          </Col>
          <Container fluid>
            <Row>
              {this.state.levels.map((level: any, index: number) => {
                return (
                  <Col
                    className={
                      window.innerWidth > 567
                        ? "rubric-item-bg"
                        : "rubric-item-mob"
                    }
                  >
                    <Text
                      style={{
                        fontWeight: 550,
                        fontSize: "12px",
                        color: "#6264A7",
                      }}
                    >
                      {level.LevelName}
                    </Text>

                    {level.LevelPoints && (
                      <>
                        <br />
                        <Text style={{ fontSize: "12px", color: "#6264A7" }}>
                          {level.LevelPoints}
                        </Text>{" "}
                        {level.LevelPoints == 1 && (
                          <Text style={{ fontSize: "12px", color: "#6264A7" }}>
                            Point
                          </Text>
                        )}
                        {level.LevelPoints > 1 && (
                          <Text style={{ fontSize: "12px", color: "#6264A7" }}>
                            Points
                          </Text>
                        )}
                      </>
                    )}
                    <br />
                    {val.Criterias[index].CriteriaDescription && (
                      <Text style={{ fontSize: "12px" }}>
                        {val.Criterias[index].CriteriaDescription}
                      </Text>
                    )}
                    {!val.Criterias[index].CriteriaDescription && (
                      <Text style={{ fontSize: "12px", fontStyle: "italic" }}>
                        No criteria
                      </Text>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Row>
      </>
    );
  };
  getResources = (val: any) => {
    var extResource = getFileExtension(val.ResourceName);
    console.log(extResource);

    return (
      <>
        <div
          className="attachment-div"
          onClick={() => this.getFile("assignments", val.ResourceUrl)}
        >
          <Flex gap="gap.small">
            {this.getFileIcon(extResource)}
            <Text style={{ fontWeight: 550 }}>{val.ResourceName}</Text>
            <FlexItem push>
              <MoreIcon />
            </FlexItem>
          </Flex>
        </div>
      </>
    );
  };

  getFile = (source: string, url: any) => {
    getFile(source, url)
      .then(async (fileResponse) => {
        if (fileResponse.status === 200) {
          console.log(fileResponse);
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  getFileIcon = (ext: any) => {
    if (
      ext === "doc" ||
      ext === "docx" ||
      ext === "docm" ||
      ext === "dotm" ||
      ext === "dotx"
    ) {
      return <WordColorIcon />;
    }
    if (ext === "pdf") {
      return <FilesPdfIcon />;
    }
    if (
      ext == "xls" ||
      ext == "xlt" ||
      ext == "xlm" ||
      ext == "xlsx" ||
      ext == "xlsm" ||
      ext == "xltx" ||
      ext == "csv"
    ) {
      return <ExcelColorIcon />;
    }
    if (ext === "txt") {
      return <FilesTxtIcon />;
    }
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="main-div">
          <Container fluid>
            <Row
              className="fltr-bar"
              style={window.innerWidth < 567 ? { padding: "10px" } : {}}
            >
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="brdcrmb brd-pdd">
                  <Text className="txt" onClick={redirectToAssignments}>
                    Assignments
                  </Text>
                  <ChevronEndIcon />
                  <Text>{this.state.assignment.AssignmentName}</Text>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="crd">
                  <Container fluid className="assgn-view-card">
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Button
                          icon={<ChevronStartIcon />}
                          text
                          primary
                          content="Back"
                          className="tran-btn "
                          onClick={redirectToAssignments}
                        />
                      </Col>
                      {this.state.assignmentID.match.params.isComplete ===
                        "false" && (
                        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                          <Button
                            content="Hand in"
                            size="small"
                            primary
                            className="hndin-btn"
                          />
                        </Col>
                      )}
                    </Row>
                    <Row className="row1 row-pdd row-assgn-padd">
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Text className="assgn-view-name">
                          {this.state.assignment.AssignmentName}
                        </Text>
                        <br />
                        <Text className="assgn-duedatetime ">
                          Due{" "}
                          {new Date(
                            this.state.assignment.DueDateTime
                          ).getDate()}{" "}
                          {
                            monthFullNames[
                              new Date(
                                this.state.assignment.DueDateTime
                              ).getMonth()
                            ]
                          }{" "}
                          {new Date(
                            this.state.assignment.DueDateTime
                          ).getFullYear()}{" "}
                          {dateTOAMORPM(
                            new Date(this.state.assignment.DueDateTime)
                          )}
                        </Text>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        className={
                          window.innerWidth < 567 ? "col-padd-mob" : ""
                        }
                      >
                        <Text className="assgn-item-header">Points</Text>
                        <br />
                        {this.state.assignment.Points && (
                          <Text className="color-text">
                            {this.state.assignment.Points} points possible
                          </Text>
                        )}
                        {!this.state.assignment.Points && (
                          <Text className="color-text">No Points</Text>
                        )}
                      </Col>
                    </Row>
                    <Row className="row-assgn-padd">
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Text className="assgn-item-header">Instructions</Text>
                        <br />
                        {this.state.assignment.Instructions &&
                          this.state.assignment.InstructionsType === "Text" && (
                            <Text className="color-text">
                              {this.state.assignment.Instructions}
                            </Text>
                          )}
                        {this.state.assignment.Instructions &&
                          this.state.assignment.InstructionsType === "Html" && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: this.state.assignment.Instructions,
                              }}
                            />
                          )}
                        {!this.state.assignment.Instructions && (
                          <Text style={{ color: "gray", fontStyle: "italic" }}>
                            None
                          </Text>
                        )}
                      </Col>
                      {this.state.assignment.AssignmentRubric.RubricId !==
                        null && (
                        <Col
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          xl={6}
                          className={
                            window.innerWidth < 567 ? "col-padd-mob" : ""
                          }
                        >
                          <Text className="assgn-item-header">Rubric</Text>
                          <br />
                          <Dialog
                            className={
                              window.innerWidth > 567 ? "rubric-dialog" : ""
                            }
                            open={this.state.setOPen}
                            onOpen={() => this.setState({ setOPen: true })}
                            onConfirm={() => this.setState({ setOPen: false })}
                            content={
                              <div>
                                <Flex>
                                  <Text
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: 550,
                                    }}
                                  >
                                    {
                                      this.state.assignment.AssignmentRubric
                                        .RubricName
                                    }
                                  </Text>
                                  {this.state.points && (
                                    <FlexItem push>
                                      <Text style={{ color: "#6264A7" }}>
                                        {this.state.points} points possible
                                      </Text>
                                    </FlexItem>
                                  )}
                                </Flex>

                                <Container>
                                  {this.state.assignment.AssignmentRubric.Qualities.map(
                                    this.getRubric
                                  )}
                                </Container>

                                <Button
                                  primary
                                  size="small"
                                  content="Close"
                                  onClick={() =>
                                    this.setState({ setOPen: false })
                                  }
                                  style={{
                                    float: "right",
                                    marginBottom: "10px",
                                  }}
                                />
                              </div>
                            }
                            headerAction={{
                              icon: <CloseIcon />,
                              title: "Close",
                              onClick: () => this.setState({ setOPen: false }),
                            }}
                            trigger={
                              <div className="attachment-div">
                                <TableIcon outline />{" "}
                                <Text>
                                  {
                                    this.state.assignment.AssignmentRubric
                                      .RubricName
                                  }
                                </Text>
                              </div>
                            }
                          />
                        </Col>
                      )}
                    </Row>
                    {this.state.assignment.Resources.length > 0 && (
                      <Row className="row3 row-assgn-padd">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Text className="assgn-item-header">
                            Reference Material
                          </Text>
                          <br />

                          {this.state.assignment.Resources.map(
                            this.getResources
                          )}
                        </Col>
                      </Row>
                    )}
                    {this.state.assignment.SubmittedResources.length > 0 && (
                      <Row className="row3 row-assgn-padd">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Text className="assgn-item-header">My Work</Text>
                          <br />
                          {this.state.assignment.SubmittedResources.map(
                            this.getResources
                          )}
                        </Col>
                      </Row>
                    )}
                    {this.state.assignmentID.match.params.isComplete ===
                      "false" && (
                      <Row className="row2">
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Button
                            size="small"
                            primary
                            icon={<PaperclipIcon />}
                            text
                            content="Add work"
                            className="tran-btn"
                          />
                          <Button
                            size="small"
                            icon={<AddIcon />}
                            text
                            primary
                            content="New"
                            className="tran-btn"
                          />
                        </Col>
                      </Row>
                    )}
                  </Container>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else {
      return (
        <div className="main-div">
          <Loader />
        </div>
      );
    }
  }
}
