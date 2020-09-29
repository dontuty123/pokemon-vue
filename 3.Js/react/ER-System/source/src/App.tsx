import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Router } from 'react-router-dom';
import history from './history';
import Table from './components/Table';
import Form from './components/Form';

const dataSource = {
  result: [
    {
      name: "boi",
      active: "0",
      action: "add"
    },
    {
      name: "tri",
      active: "1",
      action: "delete"
    }
  ],
  totalPage: 10,
  totalPageRecord: 1,
  totalRecord: 1,
  currentPage: 1,
  sortBy: "name-ASC"
}

const columns = [
  {
    title: "Name",
    idIndex: "name",
    sort: true
  },
  {
    title: "Active",
    idIndex: "active",
    render: (value: any, record: any) => {
      const checked = value === "1"
      return <input 
                readOnly
                key={value+record.name}
                type="checkbox"
                checked={checked}
            />
    }
  },
  {
    title: "Action",
    idIndex: "action",
    sort: true,
    render: (value: any, record: any) => {
      return <input 
                readOnly
                key={value+record.name}
                type="button"
                value={value}
            />
    }
  }
]

const columnsFrom = [
  {
    title: "Name",
    idIndex: "name"
  },
  {
    title: "Type",
    idIndex: "type",
    type: "select",
    validate: true,
    options: [{title: "a", value: 1}]
  },
  {
    title: "Check",
    idIndex: "check",
    type: "checkbox"
  },
  {
    title: "File",
    idIndex: "file",
    type: "file",
  },
]

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Header />
        <div style={{marginTop: 100}}>
          <Form 
            idForm="test"
            dataSource={[]}
            columns={columnsFrom}
            onChange={(e) => {}}
          />
          <Table 
            idTable="test"
            dataSource={dataSource}
            columns={columns}
            onChange={(e) => {}}
            onClick={(e) => {}}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
