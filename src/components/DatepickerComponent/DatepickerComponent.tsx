import React from "react";
import {
  Popup,
  DatepickerCalendar,
  CalendarIcon,
  Text,
  Flex,
  FlexItem,
  CloseIcon,
} from "@fluentui/react-northstar";
import { dayShortNames, monthShortNames } from "../../util/lib";

interface IDatepicker {
  open: boolean;
  selectedDate: any;
}

interface IDatepickerProps {
  position: any;
  align: any;
}

export default class DatepickerComponent extends React.Component<
  IDatepickerProps,
  IDatepicker
> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      selectedDate: new Date(),
    };
  }

  handleSelectDate = (id: any) => {
    this.setState({
      selectedDate: new Date(id.value.key),
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Popup
          open={this.state.open}
          content={
            <div>
              <DatepickerCalendar
                firstDayOfWeek={0}
                selectedDate={this.state.selectedDate}
                onDateChange={(e, id: any) => this.handleSelectDate(id)}
              />
            </div>
          }
          position={this.props.position}
          align={this.props.align}
          trigger={
            <div
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: "2px",
                cursor: "pointer",
                padding: "5px",
              }}
              onClick={() => this.setState({ open: !this.state.open })}
            >
              <Flex>
                <Text style={{ fontSize: "12px", color: "gray" }}>
                  {dayShortNames[new Date(this.state.selectedDate).getDay()]},{" "}
                  {
                    monthShortNames[
                      new Date(this.state.selectedDate).getMonth()
                    ]
                  }{" "}
                  {new Date(this.state.selectedDate).getDate()},{" "}
                  {new Date(this.state.selectedDate).getFullYear()}{" "}
                </Text>
                <FlexItem push>
                  <CalendarIcon
                    outline
                    style={{ color: "#6264a7" }}
                    size="small"
                  />
                </FlexItem>
              </Flex>
            </div>
          }
        />
      </div>
    );
  }
}
