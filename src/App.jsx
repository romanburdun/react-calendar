import React, {Component} from 'react';
import moment from "moment";
import './App.scss';
import './controls.scss'
import {ArrowLeft , ArrowRight} from '@material-ui/icons';

class App extends Component{

  state = {
    calendarDate: null,
    selected: null
  }

  constructor(props) {
    super(props);


    this.state = {
      calendarDate: moment(),
      selectedDate: null,
      selected: moment().format("d")
    }


  }

  componentDidMount() {

  }

  incrementMonth() {
    let {calendarDate} = this.state;

    calendarDate.add(1, 'month');

    this.setState({calendarDate: calendarDate})
  }

  decrementMonth() {
    let {calendarDate} = this.state;

    calendarDate.subtract(1, 'month');

    this.setState({calendarDate: calendarDate})
  }


  incrementYear() {
    let {calendarDate} = this.state;

    calendarDate.add(1, 'year');

    this.setState({calendarDate: calendarDate})
  }

  decrementYear() {
    let {calendarDate} = this.state;

    calendarDate.subtract(1, 'year');

    this.setState({calendarDate: calendarDate})
  }


  drawDatesgrid() {
    let monthDays = this.state.calendarDate.daysInMonth();
    let firstDay = this.state.calendarDate.startOf('month').format('d')
    let {selected} = this.state;

    let empty = [];


    // Getting empty cells data
    for (let i = 0; i< firstDay; i++) {
      empty.push(<td key={`${new Date().getTime()}${i}`} className={"day empty"}>{""}</td>);
    }

    let days = [];

    // Getting dates cells data
    for(let day = 1; day <= monthDays; day++) {
      let activeDate = day === +selected ? "selected" : ""
          days.push(<td key={day} onClick={(e)=> this.onDateClick(day)} className={`day ${activeDate}`}>{day}</td>)
    }

    // Merging empty cells with dates cells
    let datesData = [...empty, ...days];

    let dateRows = [];
    let dateCells = [];

    // Mapping dates to each row object
    datesData.forEach((row,i)=> {
      if(i%7 !== 0) {
        dateCells.push(row)
      } else {
        dateRows.push(dateCells)
        dateCells = [];
        dateCells.push(row);
      }

      if (i === datesData.length - 1) {
        dateRows.push(dateCells);
      }
    })

    // Creating array of rows elements
    let datesGrid = dateRows.map((datesRow, index) => {
      return <tr className={"calendar-row"} key={index}>{datesRow}</tr>
    })

    return datesGrid;
  }

  dayLabels = () => {



    let days = moment.weekdaysShort();
    let datesDays
    datesDays = days.map(day => {
      return (
          <th className={"calendar-week-day"} key={day}>
            {day}
          </th>
      );
    });
    return datesDays;
  }

  onDateClick = (date) => {

    let {calendarDate} = this.state;
    let newCalendarDate = calendarDate.clone().date(date);
    this.setState({selectedDate: newCalendarDate, selected: date})


    setTimeout(()=> {
      console.log(this.state.selectedDate.format("yyyy-MM-DD"))
    }, 300)

  }

  render() {

    let {calendarDate} = this.state;
    return (

        <div className={"wrapper"}>

          <div className="calendar">
            <div className={"select"}>

            <span className={"arrow"} onClick={(e)=> this.decrementYear()}>
              <ArrowLeft fontSize={"large"}/>
            </span>
              <h4>{calendarDate.format('YYYY')}</h4>
              <span className={"arrow"} onClick={(e)=> this.incrementYear()}>
              <ArrowRight fontSize={"large"}/>
            </span>
            </div>

            <div className={"select"}>
            <span className={"arrow"} onClick={(e)=> this.decrementMonth()}>
              <ArrowLeft fontSize={"large"} />
            </span>
              <h4>{calendarDate.format('MMMM')}</h4>

              <span className={"arrow"} onClick={(e)=> this.incrementMonth()}>
              <ArrowRight fontSize={"large"} />
            </span>
            </div>


            <table className={"calendar-table"}>
              <thead>
              <tr>{this.dayLabels()}</tr>
              </thead>
              <tbody>
              {this.drawDatesgrid()}
              </tbody>
            </table>
          </div>

        </div>
    );
  }



}

export default App;
