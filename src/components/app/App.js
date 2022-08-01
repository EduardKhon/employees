import { Component } from "react";

import AppFilter from "../app-filter/app-filter";
import AppInfo from "../app-info/app-info";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import EmployeesList from "../employees-list/employees-list";
import SearchPanel from "../search-panel/search-panel";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Eddie K.", salary: 3000, increase: true, rise: true, id: 1 },
        { name: "John S.", salary: 200, increase: false, rise: false, id: 2 },
        { name: "Alex A.", salary: 1250, increase: false, rise: false, id: 3 },
        { name: "Sarah A.", salary: 1550, increase: true, rise: false, id: 4 }
      ],
      term: ''
    }
    this.maxId = 5; 
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr =  [...data, newItem];
      return {
        data: newArr
      }
    });
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item
      })
    }))
  }

  onToggleRise  = (id) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if (item.id === id) {
          return {...item, rise: !item.rise}
        }
        return item
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  render() {
    const {data, term} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.searchEmp(data, term);

    return (
      <div className="app">
        <AppInfo employees={employees} increased={increased}/>

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter />
        </div>

        <EmployeesList 
          data={visibleData} 
          onDelete={this.deleteItem} 
          onToggleProp={this.onToggleProp}
          />
        <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App;
