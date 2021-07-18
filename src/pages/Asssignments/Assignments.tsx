import React from "react";
import "./Assignments.scss";
import "../../app/App.scss";
import {
  Text,
  Button,
  Flex,
  Popup,
  FlexItem,
  FilterIcon,
  Avatar,
  Loader,
  Checkbox,
  Divider,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { SearchIcon } from "@fluentui/react-icons-northstar";
import AssignmentList from "../../components/Assignments/AssignmentsList/AssignmentsList";
import { openSubmission } from "../../util/redirect";
import AssignmentsView from "../../components/Assignments/AssignmentView/AssignmentView";
import { getMyClasses } from "../../apis/api";

interface IActivity {
  myClasses: [];
  isClasses: boolean;
}

class Assignments extends React.Component<{}, IActivity> {
  constructor(props: any) {
    super(props);
    this.state = {
      myClasses: [],
      isClasses: false,
    };
  }
  componentDidMount = async () => {
    await this.loadClasses("dashboard");
  };

  loadClasses = (source: string) => {
    getMyClasses(source)
      .then(async (classResponse) => {
        if (classResponse.status === 200) {
          this.setState({
            myClasses: classResponse.data.ResultData,
            isClasses: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  getFilterRows = (val: any) => {
    //console.log(val.ClassName);
    return (
      <Row>
        <Col>
          <Text>{val.ClassName}</Text>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <Checkbox />
        </Col>
      </Row>
    );
  };

  getClassCards = (val: any) => {
    return (
      <>
        {window.innerWidth > 567 && (
          <Col
            md={4}
            lg={4}
            xl={4}
            className="subj-element"
            onClick={() => {
              openSubmission(val.ClassId);
            }}
          >
            <div className="crd sub-card-item-pdd">
              <Container fluid className="subj-card">
                <Row className="subj-card-row">
                  <Col>
                    <Avatar size={"larger"} name={val.ClassName} square />
                  </Col>
                </Row>
                <Row className="subj-card-row">
                  <Col>
                    <Text className="subj-text">{val.ClassName}</Text>
                  </Col>
                </Row>
                <Row className="subj-card-row">
                  <Col>
                    <Text className="subj-code">{val.ClassCode}</Text>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        )}
        {window.innerWidth <= 567 && (
          <>
            <Col
              xs={12}
              sm={12}
              onClick={() => {
                openSubmission(val.ClassId);
              }}
              className="mob-card-row"
            >
              <div className="assign-mob">
                <Flex gap="gap.medium">
                  <Avatar size={"large"} name={val.ClassName} square />

                  <Text className="subj-text">{val.ClassName}</Text>
                </Flex>
              </div>
            </Col>
          </>
        )}
      </>
    );
  };

  render() {
    if (localStorage.getItem("UserRole") === "student") {
      if (this.state.isClasses) {
        return (
          <div className="main-div">
            <div
              className="fltr-bar"
              style={window.innerWidth < 567 ? { padding: "10px" } : {}}
            >
              <Flex gap="gap.small">
                <FlexItem push>
                  <div>
                    <Popup
                      trigger={
                        <Button icon={<FilterIcon />} text content="Filter" />
                      }
                      position={"below"}
                      align={"end"}
                      content={
                        <Container fluid style={{ fontSize: "12px" }}>
                          <Row>
                            <Col>
                              <Text style={{ fontWeight: 550 }}>Filter</Text>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                              <Text style={{ color: "#464775" }}>Clear</Text>
                            </Col>
                          </Row>
                          <Divider />
                          {this.state.myClasses.map(this.getFilterRows)}
                        </Container>
                      }
                    />
                  </div>
                </FlexItem>
                <div className="srch">
                  <input placeholder="Find" className="filtr-input" />
                  <SearchIcon />
                </div>
              </Flex>
            </div>
            <div className="cont-div">
              <AssignmentList classes={this.state.myClasses} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="main-div ">
            <Loader />
          </div>
        );
      }
    } else if (localStorage.getItem("UserRole") === "faculty") {
      if (this.state.isClasses) {
        return (
          <div className="main-div2">
            <Container fluid className="sub-cards-padd">
              <Row>{this.state.myClasses.map(this.getClassCards)}</Row>
            </Container>
          </div>
        );
      } else {
        return (
          <div className="main-div ">
            <Loader />
          </div>
        );
      }
    } else {
      return <></>;
    }
  }
}

export default Assignments;
