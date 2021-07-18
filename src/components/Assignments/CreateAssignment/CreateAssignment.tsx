import React from "react";
import "../../../app/App.scss";
import "./CreateAssignment.scss";
import {
  Text,
  Flex,
  FlexItem,
  Divider,
  Button,
  Input,
  Dropdown,
  Dialog,
  Popup,
  Checkbox,
  RadioGroup,
  CloseIcon,
  TagIcon,
  PaperclipIcon,
  AddIcon,
  TableIcon,
  CalendarIcon,
  ParticipantAddIcon,
  PresenceAvailableIcon,
  DatepickerCalendar,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { redirectToDashboard } from "../../../util/redirect";
import { inputTime, monthShortNames, dayShortNames } from "../../../util/lib";
import DatepickerComponent from "../../DatepickerComponent/DatepickerComponent";

const items = [
  {
    key: "1",
    label: "Don't assign to students added to this class in the future.",
    value: "1",
  },
  {
    key: "2",
    label: "Assign to all students added to this class in the future.",
    value: "2",
  },
];

const dropdown: any[] = [];

interface ICreateAssignment {
  titleValue: string;
  assignBtnDisable: boolean;
  categorySelected: boolean;
  assignToAllStudents: boolean;
  open: boolean;
  openDialog: boolean;
  assignStudentsLabel: any;
  defaultChecked: string;
  selectedDate: any;
  datepicker: boolean;
}
interface ICreateAssignmentProps {
  classes: any;
}
class CreateAssignment extends React.Component<
  ICreateAssignmentProps,
  ICreateAssignment
> {
  constructor(props: any) {
    super(props);
    this.state = {
      titleValue: "",
      assignBtnDisable: true,
      categorySelected: false,
      assignToAllStudents: false,
      open: false,
      openDialog: false,
      assignStudentsLabel: items[0].label,
      defaultChecked: items[0].value,
      selectedDate: new Date(),
      datepicker: false,
    };
  }
  componentDidMount = async () => {
    await this.props.classes.map(this.getClassItems);
  };
  getClassItems = (val: any) => {
    dropdown.push({ key: val.ClassId, header: val.ClassName });
  };

  handleTitleChange = async (id: any) => {
    await this.setState({
      titleValue: id.value,
    });
    if (this.state.titleValue.length > 0) {
      this.setState({ assignBtnDisable: false });
    }
    if (this.state.titleValue.length === 0) {
      this.setState({ assignBtnDisable: true });
    }
  };
  selectCategory = () => {
    this.setState({ categorySelected: true });
  };
  removeSelectedCategory = () => {
    this.setState({ categorySelected: false });
  };

  changeAssignStudent = () => {
    console.log("Confirm pressed");
  };

  confirmEdit1 = async () => {
    if (this.state.assignToAllStudents) {
      this.setState({
        assignStudentsLabel: items[1].label,
        defaultChecked: items[1].value,
      });
    } else {
      this.setState({
        assignStudentsLabel: items[0].label,
        defaultChecked: items[0].value,
      });
    }
    this.setState({ open: false });
  };

  handleSelectDate = (id: any) => {
    this.setState({
      selectedDate: new Date(id.value.key),
      datepicker: false,
    });
  };

  handleClassDropdown = (id: any) => {
    console.log(id.value);
    console.log(id.value.length);
  };

  render() {
    return (
      <div className="main-div">
        <div className="div-form">
          <Container>
            <Row>
              <Col>
                <Text className="create-assgn-hd">New assignment</Text>
              </Col>
              <Col md={4} lg={4} xl={4}>
                <Flex gap="gap.medium">
                  <Dialog
                    cancelButton="No"
                    confirmButton="Yes"
                    onConfirm={redirectToDashboard}
                    header="Are you sure you want to discard this assignment?"
                    trigger={<Button content="Discard" />}
                  />
                  <Button content="Save" />{" "}
                  <Button
                    content="Assign"
                    primary
                    disabled={this.state.assignBtnDisable}
                  />
                </Flex>
              </Col>
            </Row>
          </Container>

          <div>
            <Container className="form-text">
              <Row>
                <Text className="create-assign-labels">Title (required)</Text>
              </Row>

              <Row>
                <Input
                  fluid
                  placeholder="Enter title"
                  onChange={(e, id) => this.handleTitleChange(id)}
                ></Input>
              </Row>
              <Row>
                {!this.state.categorySelected && (
                  <>
                    <Popup
                      position="below"
                      align="center"
                      trigger={
                        <Button
                          icon={<TagIcon />}
                          text
                          primary
                          content="Add category"
                          className="icon-btn"
                          size="small"
                        />
                      }
                      content={
                        <div>
                          <Container>
                            <Row>
                              <Button
                                text
                                primary
                                icon={<TagIcon />}
                                content="Assignment"
                                size="small"
                                onClick={this.selectCategory}
                              />
                            </Row>
                          </Container>
                          <Button
                            primary
                            icon={<AddIcon />}
                            content="New category"
                          />
                        </div>
                      }
                    />
                  </>
                )}
                {this.state.categorySelected && (
                  <div className="category">
                    <Flex gap="gap.small">
                      <TagIcon
                        size="small"
                        outline
                        style={{ padding: "2px" }}
                      />

                      <Text
                        style={{
                          fontSize: "12px",
                          color: "gray",
                        }}
                      >
                        Assignment
                      </Text>

                      <CloseIcon
                        size="small"
                        style={{ padding: "2px" }}
                        onClick={this.removeSelectedCategory}
                      />
                    </Flex>
                  </div>
                )}
              </Row>
              <Row>
                <Text className="create-assign-labels">Instructions</Text>
              </Row>
              <Row>
                <Input fluid placeholder="Enter instructions"></Input>
              </Row>
              <Row>
                <Button
                  primary
                  icon={<PaperclipIcon />}
                  text
                  content="Add resources"
                  className="icon-btn"
                  size="small"
                />
                <Button
                  icon={<AddIcon />}
                  text
                  primary
                  content="New"
                  className="icon-btn"
                  size="small"
                />
              </Row>
              <Row>
                <Text className="create-assign-labels">Points</Text>
              </Row>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <Input type="number" fluid placeholder="No points"></Input>
                </Col>
              </Row>
              <Row>
                <Button
                  icon={<TableIcon />}
                  text
                  primary
                  content="Add rubric"
                  className="icon-btn"
                  size="small"
                />
              </Row>
              <Row>
                <Text className="create-assign-labels">Assign to</Text>
              </Row>
              <Row>
                <Col>
                  <Dropdown
                    items={dropdown}
                    defaultValue={"Test Class"}
                    fluid
                    multiple
                    placeholder="Select classes"
                    onChange={(e, id) => this.handleClassDropdown(id)}
                  />
                </Col>
                <Col>
                  <div className="picker-dropdown-div">
                    <Flex>
                      <Text>All students</Text>
                      <FlexItem push>
                        <ParticipantAddIcon
                          className="icon-color"
                          outline
                          size="small"
                        />
                      </FlexItem>
                    </Flex>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text style={{ fontSize: "12px" }}>
                    {this.state.assignStudentsLabel}
                  </Text>{" "}
                  <Dialog
                    open={this.state.open}
                    onOpen={() => this.setState({ open: true })}
                    content={
                      <>
                        <RadioGroup
                          vertical
                          defaultCheckedValue={this.state.defaultChecked}
                          items={items}
                          onCheckedValueChange={() =>
                            this.setState({
                              assignToAllStudents:
                                !this.state.assignToAllStudents,
                            })
                          }
                        />
                        <Flex gap="gap.medium" className="edit1">
                          <FlexItem push>
                            <Button
                              content="Cancel"
                              onClick={() => this.setState({ open: false })}
                            />
                          </FlexItem>
                          <Button
                            primary
                            content="Done"
                            onClick={() => this.confirmEdit1()}
                          />
                        </Flex>
                      </>
                    }
                    header="Edit student assignment settings"
                    headerAction={{
                      icon: <CloseIcon />,
                      title: "Close",
                      onClick: () => this.setState({ open: false }),
                    }}
                    trigger={
                      <Text
                        style={{
                          fontSize: "12px",
                          color: "rgb(98, 100, 167)",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </Text>
                    }
                  />
                </Col>
              </Row>
              <Row className="create-assign-labels">
                <Col>
                  <Text>Date due</Text>
                </Col>
                <Col>
                  <Text>Time due</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <DatepickerComponent position="below" align="start" />
                </Col>
                <Col>
                  <Dropdown
                    placeholder="Select due time"
                    items={inputTime}
                    defaultValue="11:59 PM"
                    fluid
                    toggleIndicator={
                      <PresenceAvailableIcon
                        className="icon-color"
                        outline
                        size="small"
                      />
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Text style={{ fontSize: "12px" }}>
                    Assignment will post immediately with late turn-ins allowed.
                  </Text>{" "}
                  <Dialog
                    style={{ height: "75%" }}
                    cancelButton="Cancel"
                    confirmButton="Done"
                    onCancel={() => this.setState({ openDialog: false })}
                    open={this.state.openDialog}
                    onOpen={() => this.setState({ openDialog: true })}
                    trigger={
                      <Text
                        style={{
                          fontSize: "12px",
                          color: "rgb(98, 100, 167)",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </Text>
                    }
                    content={
                      <div className="dialog-cont">
                        <Divider />
                        <Checkbox label="Schedule to assign in the future" />
                        <Container fluid>
                          <Row>
                            <Col>
                              <Text className="date-hd">Post date</Text>
                            </Col>
                            <Col>
                              <Text className="date-hd">Post time</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <DatepickerComponent
                                position={"below"}
                                align={"start"}
                              />
                            </Col>
                            <Col>
                              <Input fluid />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Text>Due date</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Text className="date-hd">Due date</Text>
                            </Col>
                            <Col>
                              <Text className="date-hd">Due time</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <DatepickerComponent
                                position={"below"}
                                align={"start"}
                              />
                            </Col>
                            <Col>
                              <Input fluid />
                            </Col>
                          </Row>
                        </Container>
                        <Checkbox label="Close date" />
                        <Container fluid>
                          <Row>
                            <Col>
                              <Text className="date-hd">Close date</Text>
                            </Col>
                            <Col>
                              <Text className="date-hd">Close time</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <DatepickerComponent
                                position={"below"}
                                align={"start"}
                              />
                            </Col>
                            <Col>
                              <Input fluid />
                            </Col>
                          </Row>
                        </Container>
                        <Text></Text>
                      </div>
                    }
                    header="Edit assignment timeline"
                    headerAction={{
                      icon: <CloseIcon />,
                      title: "Close",
                      onClick: () => this.setState({ openDialog: false }),
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAssignment;
