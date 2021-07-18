import React from "react";
import "../../../app/App.scss";
import "./CalenderView.scss";
import {
  Text,
  Button,
  Tooltip,
  DatepickerCalendar,
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronEndIcon,
  Loader,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllAssignments } from "../../../apis/api";
import { monthFullNames } from "../../../util/lib";
import Filter from "../HeaderComponents/Filter";
import InputFilter from "../HeaderComponents/InputFilter";

const localizer = momentLocalizer(moment);
const now = new Date();

const events = [];

class CalenderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      plannedAssignments: [],
      completedAssignments: [],
      isLoaded: false,
      defaultDate: moment().toDate(),
      selectedDate: null,
      navigatedDate: moment().toDate(),
      currentMonthIndex: moment().toDate().getMonth(),
      currentMonth: monthFullNames[moment().toDate().getMonth()],
      currentYear: moment().toDate().getFullYear(),
    };
  }

  componentDidMount = async () => {
    //console.log(this.props.classes);

    await this.loadAllAssignments("dashboard");
  };

  loadAllAssignments = (source) => {
    getAllAssignments(source)
      .then(async (assgnResponse) => {
        if (assgnResponse.status === 200) {
          await this.setState({
            plannedAssignments: assgnResponse.data.ResultData.Planned,
            completedAssignments: assgnResponse.data.ResultData.Completed,
          });
          this.state.plannedAssignments.map((plan) => {
            events.push({
              id: plan.AssignmentId,
              title: plan.AssignmentName,
              start: new Date(plan.DueDateTime),
              end: new Date(plan.DueDateTime),
              color: "#F9C6CF",
              textcolor: "#D48691",
            });
          });
          this.state.completedAssignments.map((cmpltd) => {
            events.push({
              id: cmpltd.AssignmentId,
              title: cmpltd.AssignmentName,
              start: new Date(cmpltd.DueDateTime),
              end: new Date(cmpltd.DueDateTime),
              color: "#DDDFF8",
              textcolor: "#757596",
            });
          });
          await this.setState({ isLoaded: true });
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/errorpage";
      });
  };

  handleDateChangeSmallCalendar = async (e, id) => {
    await this.setState({ selectedDate: new Date(id.value.key) });
    this.setState({
      defaultDate: this.state.selectedDate,
      navigatedDate: this.state.selectedDate,
      currentMonth: monthFullNames[this.state.selectedDate.getMonth()],
      currentMonthIndex: this.state.selectedDate.getMonth(),
    });
  };

  nextMonth = async () => {
    var nextMonth;
    var current = this.state.currentMonthIndex;
    if (current === 11) {
      nextMonth = 0;
      this.setState({ currentYear: this.state.currentYear + 1 });
    } else {
      nextMonth = current + 1;
    }

    await this.setState({
      currentMonth: monthFullNames[nextMonth],
      currentMonthIndex: nextMonth,
    });
    this.setState({
      defaultDate: new Date(
        this.state.currentYear,
        this.state.currentMonthIndex,
        1
      ),
      navigatedDate: new Date(
        this.state.currentYear,
        this.state.currentMonthIndex,
        1
      ),
    });
    console.log(this.state.navigatedDate);
  };

  previousMonth = async () => {
    var previousMonth;
    var current = this.state.currentMonthIndex;
    if (current === 0) {
      previousMonth = 11;
      this.setState({ currentYear: this.state.currentYear - 1 });
    } else {
      previousMonth = current - 1;
    }
    await this.setState({
      currentMonth: monthFullNames[previousMonth],
      currentMonthIndex: previousMonth,
    });
    this.setState({
      defaultDate: new Date(
        this.state.currentYear,
        this.state.currentMonthIndex,
        1
      ),
      navigatedDate: new Date(
        this.state.currentYear,
        this.state.currentMonthIndex,
        1
      ),
    });
    console.log(this.state.navigatedDate);
  };

  render() {
    if (this.state.isLoaded) {
      return (
        <div className="main-div">
          <Container fluid>
            <Row style={{ paddingTop: "10px" }}>
              <Col style={{ fontWeight: "bold" }}>
                <Text
                  className="txt"
                  onClick={() => this.props.onHandleScreen(null)}
                >
                  Dashboard
                </Text>
                <ChevronEndIcon />
                <Text>Calendar</Text>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={10}
                lg={10}
                xl={10}
                className="fltr-bar-brdcrmb-shadow"
              >
                <div style={window.innerWidth > 567 ? { float: "right" } : {}}>
                  <Filter classData={this.props.classes} />
                  <InputFilter />
                </div>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row className="cal-row">
              <Col md={2} lg={2} xl={2} className="div-shadow cal-col">
                <DatepickerCalendar
                  selectedDate={this.state.selectedDate}
                  onDateChange={(e, id) => {
                    this.handleDateChangeSmallCalendar(e, id);
                  }}
                  firstDayOfWeek={0}
                  navigatedDate={this.state.navigatedDate}
                />
              </Col>
              <Col>
                <div
                  style={{
                    height: 700,
                    paddingInline: "20px",
                    paddingTop: "10px",
                    paddingBottom: "40px",
                  }}
                >
                  <Tooltip
                    trigger={
                      <Button
                        icon={<ArrowUpIcon />}
                        text
                        iconOnly
                        size="medium"
                        onClick={this.previousMonth}
                      />
                    }
                    content="Go to previous month"
                  />
                  <Tooltip
                    trigger={
                      <Button
                        icon={<ArrowDownIcon />}
                        text
                        iconOnly
                        size="medium"
                        onClick={this.nextMonth}
                      />
                    }
                    content="Go to next month"
                  />

                  <Text style={{ fontWeight: 1000, fontSize: "16px" }}>
                    {this.state.currentMonth} {this.state.currentYear}
                  </Text>

                  <Calendar
                    selectable={true}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    date={new Date(this.state.defaultDate)}
                    localizer={localizer}
                    eventPropGetter={(event) => ({
                      style: {
                        backgroundColor: event.color,
                        color: event.textcolor,
                      },
                    })}
                    onSelectSlot={(e) => {
                      console.log(e.start);
                    }}
                    toolbar={false}
                  />
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

export default CalenderView;
