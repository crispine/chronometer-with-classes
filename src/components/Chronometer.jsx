import React, { Component } from 'react'
import Button from "./Button"
import List from "./List"
import { generate as id } from "shortid"

class Chronometer extends Component {

    state = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        running: false,
        allTimestamps: [],
        started: false
    }

    // it initializes the chronometer
    handleInit = () => {
        if(!this.state.running) {
            this.interval = setInterval(() => {
                this.tick()
            }, 100)

            this.setState({ running: true, started: true })
        }
    }

    // it makes the chronomether count time
    tick() {
        let hours = this.state.hours
        let minutes = this.state.minutes
        let seconds = this.state.seconds
        let miliseconds = this.state.miliseconds + 1

        if(miliseconds === 10) {
            miliseconds = 0
            seconds = seconds + 1
        }

        if(seconds === 60) {
            seconds = 0
            minutes = minutes + 1
        }

        if(minutes === 60) {
            minutes = 0
            hours = hours + 1
        }

        this.updatetimer(miliseconds, seconds, minutes, hours)
    }

    // it stops the chronometer
    handleStop = () => {
        if(this.state.running) {
            clearInterval(this.interval)
            this.setState({ running: false })
        }
    }

    // it prints the current time of the chronometer
    handleTimestamp = () => {
        const { hours, minutes, seconds, miliseconds, allTimestamps } = this.state

        const timestamp = { hours, minutes, seconds, miliseconds }

        const timestamps = allTimestamps

        timestamps.push(timestamp)

        this.setState({ allTimestamps: timestamps })
    }

    // it resets the count of the chronometer and its list of timestamps
    handleReset = () => {
        this.updatetimer(0, 0, 0, 0)
        this.setState({ allTimestamps: [], started: false })
    }

    // it updates the time of the chronometer
    updatetimer(miliseconds, seconds, minutes, hours) {
        this.setState({
            miliseconds, seconds, minutes, hours
        })
    }

    // it puts an extra zero on chronometer's time
    addZero(value) {
        return value < 10 ? `0${value}`: value
    }

    render() {
        let { hours, minutes, seconds, miliseconds, running, allTimestamps } = this.state
        hours = this.addZero(hours)
        minutes = this.addZero(minutes)
        seconds = this.addZero(seconds)
        miliseconds = this.addZero(miliseconds)

        return (
            <>
                <h2>{`${hours} : ${minutes} : ${seconds} : ${miliseconds}`}</h2>
                <Button disabled={running} onClick={this.handleInit}>START</Button>
                <Button disabled={!running} onClick={this.handleStop}>STOP</Button>
                <Button disabled={!running} onClick={this.handleTimestamp}>TIMESTAMP</Button>
                {this.state.started && <Button disabled={running} onClick={this.handleReset}>RESET</Button>}
                <List>
                    {allTimestamps.map((timestamp, idx) => (
                        <li key={id()}>
                            {`
                                ${idx + 1} -
                                ${this.addZero(timestamp.hours)} : 
                                ${this.addZero(timestamp.minutes)} : 
                                ${this.addZero(timestamp.seconds)} : 
                                ${this.addZero(timestamp.miliseconds)}
                            `}
                        </li>
                    ))}
                </List>
            </>
        )
    }
}

export default Chronometer;
