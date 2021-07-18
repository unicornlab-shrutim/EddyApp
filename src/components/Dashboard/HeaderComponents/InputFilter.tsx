import React from "react";
import "../../../app/App.scss";
import { SearchIcon, Input, Flex } from "@fluentui/react-northstar";

interface IInputFilter {
  input: string;
}

export default class InputFilter extends React.Component<{}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div
          className="srch srch-flt-right"
          style={window.innerWidth < 567 ? { marginTop: "5px" } : {}}
        >
          <Flex gap="gap.small">
            <input placeholder="Find" className={"filtr-input"} />
            <SearchIcon />
          </Flex>
        </div>
      </>
    );
  }
}
