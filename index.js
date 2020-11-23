import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Table } from "antd";
import { HotKeys } from "react-hotkeys";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a href="#">{text}</a>
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park"
  }
];

const keyMap = {
  INVERT: "ctrl+i",
  SELECT_ALL: "ctrl+a"
};

class App extends React.Component {
  state = {
    selectedRowKeys: []
  };
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
    this.setState({ selectedRowKeys });
  };
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };
  selectAll = (selectedRowKeys) => {
    const allRowKeys = data.map((item) => item.key);
    selectedRowKeys = allRowKeys;
    this.setState({ selectedRowKeys });
    event.preventDefault();
  };
  invertAll = (selectedRowKeys) => {
    const selectedRows = [...this.state.selectedRowKeys];
    const allRowKeys = data.map((item) => item.key);
    selectedRowKeys = allRowKeys.filter(x => !selectedRows.includes(x));
    this.setState({ selectedRowKeys });
  };
  render() {
    const handlers = {
      INVERT: this.invertAll,
      SELECT_ALL: this.selectAll
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    };
    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record);
            }
          })}
        />
      </HotKeys>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
