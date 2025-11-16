// Part 1 
// Ex 1.6 - 1.10 (Unicafe) 1.11 optional but completed

import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFB = () =>{
    // console.log("Before", good)
    // console.log("Good FB Clicked")
    let newGood = good + 1
    setGood(newGood)
    //console.log("After", newGood)
  }

  const neutralFB = () =>{
    let newNeut = neutral + 1
    setNeutral(newNeut)
  }

  const badFB = () =>{
    let newBad = bad + 1
    setBad(newBad)    
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick = {goodFB} text="Good"/>
      <Button onClick = {neutralFB} text="Neutral"/>
      <Button onClick = {badFB} text="Bad"/>
      <br/>
      <br/>
      <div>------------------------</div>
      <h1>Stats</h1>
      <table>
        <tbody>
          <Statistics props = {{good,bad,neutral}}/>
        </tbody>
      </table>
    </>
  )
}

// create each stat line + corresponding value
const StatisticLine = ({text, value}) =>{
  return(
    <>
      <tr>
        <td>{text}</td>
        <td align="end">{value}</td>
      </tr>
    </>
  )
}


// all the compo here
// good, bad, neutral, total, average, positive
const Statistics = ({props}) => {

  let total = props.good + props.neutral + props.bad
  let positive = ((props.good / total) * 100).toFixed(2)
  let average = ((props.good + props.bad) / total).toFixed(2)

  if(total == 0){
    return(<tr><td>No Feedback Given</td></tr>)
  }

  return(
    <>
      <StatisticLine text = {"Good"} value = {props.good}/>
      <StatisticLine text = {"Neutral"} value = {props.neutral}/>
      <StatisticLine text = {"Bad"} value = {props.bad}/>
      <StatisticLine text = {"Total"} value = {total}/>
      <StatisticLine text = {"Average"} value = {average}/>
      <StatisticLine text = {"Positive"} value = {positive + "%"}/>
    </>
  )
}

// button for each feedback
const Button = ({onClick,text}) => <button onClick = {onClick}>{text}</button>


export default App