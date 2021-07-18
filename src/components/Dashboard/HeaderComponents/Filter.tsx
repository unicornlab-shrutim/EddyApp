import React from "react";
import {
  Text,
  Divider,
  Button,
  FilterIcon,
  Popup,
  Checkbox,
} from "@fluentui/react-northstar";
import { Container, Row, Col } from "react-bootstrap";

interface IFilterProps {
  classData: any;
}

interface IFilter {}

export default class Filter extends React.Component<IFilterProps, IFilter> {
  getFilterRows = (val: any) => {
    return (
      <>
        <Row>
          <Col>
            <Text>{val.ClassName}</Text>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3} xl={3}>
            <Checkbox />
          </Col>
        </Row>
      </>
    );
  };

  render() {
    return (
      <>
        <Popup
          trigger={<Button icon={<FilterIcon />} text content="Filter" />}
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
              {this.props.classData.map(this.getFilterRows)}
            </Container>
          }
        />
      </>
    );
  }
}
