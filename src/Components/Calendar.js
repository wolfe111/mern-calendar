/**
 * Created by Jack on 09/09/2017.
 */
import React, { Component } from 'react';
import style from '../style';
import CalenderGrid from './CalenderGrid'
import Button from './Button'

class Calender extends Component {
    constructor(props) {
        super(props);
        this.weekCount = this.weekCount.bind(this);
        this.getFirstDayOfMonth = this.getFirstDayOfMonth.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        const d = new Date();
        this.year = d.getUTCFullYear();
        this.month = d.getUTCMonth() + 1;
        this.state = { calenderArray: this.weekCount(this.year, this.month) };
    }

    weekCount(year, month) {
        // month_number is in the range 1..12
        // const firstOfMonth = new Date(year, month, 1);
        let calArray = [];
        const firstDayOfMonth = this.getFirstDayOfMonth(year, month);
        const lastDayOfMonth = new Date(year, month, 0).getDate();

        const used = firstDayOfMonth + lastDayOfMonth;

        const weeksInMonth = Math.ceil( used / 7);
        let dayCount = 1;
        for (let i = 0; i < weeksInMonth; i++) {
            debugger
            let {newWeek, day} = this.createDays(firstDayOfMonth, dayCount, lastDayOfMonth);
            dayCount = day;
            calArray.push(newWeek)
        }
        return calArray;
    }

    createDays(firstDayOfMonth, day, lastDayOfMonth) {
        let newWeek = [];
        for (let j = 1; j <= 7; j++) {
            if (j === firstDayOfMonth) {
                newWeek.push(day);
                day++;
            } else if ((day === 1 && j !== firstDayOfMonth) || (day > lastDayOfMonth)) {
                newWeek.push(0);
            } else {
                newWeek.push(day);
                day++
            }
        }
        return {newWeek, day}
    }
    getFirstDayOfMonth(year, month) {
        return new Date(year + "-" + month + "-01").getDay();
    }

    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    backButton () {
        console.log('oooo back in time')
    }

    forwardButton () {
        console.log('oooo forward in time')
    }

    ///// need to change this so we get the images from node, for the mean time store images in src

    render () {
        return (
            <div>
                <div>
                    <Button
                        buttonClick={() => this.backButton()}
                        imageSource={require('../images/backBtn.png')}
                        buttonType={'back'}
                    />
                    <h1 style={style.title}>Calender Mern App</h1>
                    <Button
                        buttonClick={() => this.forwardButton()}
                        imageSource={require('../images/forwardBtn.png')}
                        buttonType={'forwardBtn'}
                    />
                </div>
                <CalenderGrid calenderArray={this.state.calenderArray}/>
            </div>
        )
    }
}

export default Calender