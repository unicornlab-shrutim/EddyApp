import React from "react";
import "./Activity.scss";
import "../../../app/App.scss";
import {
  Flex,
  FlexItem,
  Button,
  Divider,
  Text,
  Loader,
} from "@fluentui/react-northstar";
import { getRecentActivity } from "../../../apis/api";
import { dateTOAMORPM } from "../../../util/lib";
import { monthShortNames } from "../../../util/lib";
import { Container, Row, Col } from "react-bootstrap";

interface IActivity {
  recentActivity: any;
  isRecentActivityLoaded: boolean;
}

interface IActivityProps {
  classes: any;
}

class Activity extends React.Component<IActivityProps, IActivity> {
  constructor(props: any) {
    super(props);
    this.state = {
      recentActivity: [],
      isRecentActivityLoaded: false,
    };
  }

  componentDidMount = async () => {
    await this.loadRecentActivity("dashboard");
  };

  loadRecentActivity = (source: string) => {
    getRecentActivity(source)
      .then(async (activityResponse) => {
        if (activityResponse.status === 200) {
          this.setState({
            recentActivity: activityResponse.data.ResultData,
            isRecentActivityLoaded: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  getTimeStamp = (eventTime: any) => {
    var tmstmp = Math.floor(
      (Date.now() - new Date(eventTime).getTime()) / 60000
    );

    if (tmstmp === 0) {
      return <Text>Just now</Text>;
    }
    if (tmstmp < 60) {
      return <Text>{tmstmp}m ago</Text>;
    }
    if (tmstmp === 60) {
      return <Text>1hr ago</Text>;
    }
    if (tmstmp > 60 && tmstmp <= 1440) {
      return <Text>{dateTOAMORPM(new Date(eventTime))}</Text>;
    }
    if (tmstmp > 1440 && tmstmp <= 525600) {
      return (
        <Text>
          {monthShortNames[new Date(eventTime).getMonth()]}{" "}
          {new Date(eventTime).getDate()} {dateTOAMORPM(new Date(eventTime))}
        </Text>
      );
    }
    if (tmstmp > 525600) {
      return (
        <Text>
          {monthShortNames[new Date(eventTime).getMonth()]}{" "}
          {new Date(eventTime).getDate()} {new Date(eventTime).getFullYear()}
        </Text>
      );
    }
  };

  renderRecentActivity = (val: any) => {
    return (
      <>
        <Row className="recent-act act-list">
          <Col>
            {val.EventType === "assignment" && (
              <div>
                {this.props.classes.map((e: any) => {
                  if (e.ClassId === val.Assignment.ClassId) {
                    return <Text>{e.ClassName}</Text>;
                  }
                })}{" "}
                <Text>assignment {val.Assignment.AssignmentName} is due </Text>{" "}
                <Text>
                  {
                    monthShortNames[
                      new Date(val.Assignment.DueDateTime).getMonth()
                    ]
                  }{" "}
                  {new Date(val.Assignment.DueDateTime).getDate()}{" "}
                  {dateTOAMORPM(new Date(val.Assignment.DueDateTime))}
                </Text>
              </div>
            )}
            {val.EventType === "feedback" && (
              <div>
                <Text>Feedback was uploaded for </Text>
                {this.props.classes.map((e: any) => {
                  if (e.ClassId === val.Assignment.ClassId) {
                    return <Text>{e.ClassName} assignment</Text>;
                  }
                })}{" "}
                <Text>{val.Assignment.AssignmentName}</Text>
              </div>
            )}
          </Col>

          <Col md={3} lg={3} xl={3}>
            <Text className="timestmp-flt-rgt">
              {this.getTimeStamp(val.EventDateTime)}
            </Text>
          </Col>
        </Row>
        <Divider className="act-list" />
      </>
    );
  };

  render() {
    if (this.state.isRecentActivityLoaded) {
      return (
        <div
          className="act-div crd"
          style={window.innerWidth > 567 ? { height: "530px" } : {}}
        >
          <div className="act-spc">
            <Flex gap="gap.small">
              <Text className="act-font colr">Activity</Text>
              <FlexItem push>
                <Button content="View all" size="small" primary />
              </FlexItem>
            </Flex>
          </div>
          <Container fluid>
            {this.state.recentActivity.map(this.renderRecentActivity)}
          </Container>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default Activity;
