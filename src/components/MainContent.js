import React from 'react'
import axios from 'axios'


export default class MainContent extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            states : {},
            output : "",
            textbox : ""
        }
        this.generateWidgetCode = this.generateWidgetCode.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        axios.get('https://api.covid19india.org/state_district_wise.json')
          .then((response)=>{
            const _tmp = response.data
            this.setState({states:_tmp})
            console.log(_tmp)
          })
          .catch((err)=>{
            console.log('Something went wrong')
          })
      }

    // The code we have to display
    generateWidgetCode(event){
        let widgetString =
        `<iframe width="1200" height="600" srcdoc ="
        <html>
        <head>
        <script crossorigin src='https://unpkg.com/react@17/umd/react.production.min.js'></script>
        <script crossorigin src='https://unpkg.com/react-dom@17/umd/react-dom.production.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js'></script>
        <script src='https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js' integrity='sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==' crossorigin='anonymous'></script>
        <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css' integrity='sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z' crossorigin='anonymous'>
        <script type='text/babel'>
            class CovidWidget extends React.Component{
                constructor(props){
                    super(props)
                    this.state = {
                        stateCode : props.stateName,
                        districtsData:{},
                    }
            }
            componentDidMount(){
                axios.get('https://api.covid19india.org/state_district_wise.json')
                .then((response)=>{
                    const _tmp = response.data[this.state.stateCode].districtData
                    this.setState({districtsData:_tmp})
                    console.log(_tmp)
                })
                .catch((err)=>{
                    console.log('Something went wrong')
                })
            }
            render(){
                let allData  = this.state.districtsData
                let totalActive = 0 , totalConfirmed = 0 , totalDeceased = 0 , totalRecovered = 0 
                Object.keys(allData).map((f)=>{
                    return (
                    totalActive = totalActive + allData[f].active,
                    totalDeceased = totalDeceased + allData[f].deceased,
                    totalConfirmed = totalConfirmed + allData[f].confirmed,
                    totalRecovered = totalRecovered + allData[f].recovered
                    )
                })
                return(
                    <div class='container p-5'>
                    <div>Data for {this.state.stateCode}</div>
                        <div class='row mt-3'>
                            <div class='col-md-4 mt-2 p-2'>
                                <div class='border p-2 rounded'>
                                <div class='row'>
                                    <div class='col-md-6'>
                                    Active: {totalActive} <br/>
                                    Confirmed: {totalConfirmed}
                                    </div>
                                    <div class='col-md-6'>
                                    Deaths: {totalDeceased} <br/>
                                    Recovered: {totalRecovered}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    <div>Disctrict level Data for {this.state.stateCode}</div>
                    <div class='row mt-3'>
                    {
                        Object.keys(allData).map((d,key)=>{
                            return (
                                <div key={key} class='col-md-4 mt-2 p-2'>
                                <div class='border p-2 rounded'>
                                <div class='text-center lead'>{d}</div>
                                <div class='row'>
                                    <div class='col-md-6'>
                                    Active: {allData[d].active} <br/>
                                    Confirmed:{allData[d].confirmed}
                                    </div>
                                    <div class='col-md-6'>
                                    Deaths: {allData[d].deceased || 0} <br/>
                                    Recovered: {allData[d].recovered}
                                    </div>
                                </div>
                                </div>
                                </div>
                            )
                          })
                        }
                        </div>
                    </div>
                    )
                }
            }
            ReactDOM.render(
            <CovidWidget stateName='%%'/>,
            document.getElementById('app')
            )
        </script>
        </head>
        <body>
        <div id='app'></div>
        </body>
        </html>"
</iframe>`

        widgetString = widgetString.replace("%%" , event.target.value)
        this.setState({output : widgetString})

        // Yet to be fixed
        // let newWidgetString = this.state.output
        // console.log(newWidgetString)
        // const value1 = event.target.name
        // switch(value1){
        //     case 'opt': {
        //         newWidgetString = newWidgetString.replace("%%" , event.target.value)
        //         this.setState({output: newWidgetString})
        //         console.log(newWidgetString)
        //         break
        //     }
        //     case 'headertext': {
        //         widgetString = widgetString.replace("%width%" , event.target.value)
        //         this.setState({output: widgetString})
        //         console.log(widgetString)
        //         break
        //     }
        //     default: {
        //         console.log("Do nothing")
        //     }
        // }
    }

    handleClick(event){
        event.preventDefault()
        this.setState({textbox: this.state.output})
    }

    render() {
        let allData = this.state.states
        return (
            <div>
                <form>
                    <h2> Enter Widget Details </h2>
                    <div className="form">
                        <label> Select State: </label>
                        <select onChange={this.generateWidgetCode}>
                        {Object.keys(allData).map((e, key) => {
                            return <option key={key} value={e}> {e}</option>
                        })}
                        </select>
                    </div>

                    {/* Not yet working, yet to be fixed */}
                    {/* <div className="form">
                        <label>Header Text: <input type="text" name="headertext" onChange={this.generateWidgetCode} /> </label>
                    </div>

                    <div className="form">
                        <label>Header Background: <input type="text" name="headerBg" /> </label>
                    </div>

                    <div className="form">
                        <label>Header Text Color: <input type="text" name="headerCol" /> </label>
                    </div>

                    <div className="form">
                        <label>Footer Text: <input type="text" name="footerText" /> </label>
                    </div>

                    <div className="form">
                        <label>Footer Background: <input type="text" name="footerBg" /> </label>
                    </div>

                    <div className="form">
                        <label>Footer Text Color: <input type="text" name="footerCol" /> </label>
                    </div>

                    <div className="form">
                        <label>Width(in px): <input type="text" name="width" /> </label>
                    </div>

                    <div className="form">
                        <label>Height(in px): <input type="text" name="height" /> </label>
                    </div> */}

                    <div className="form">
                        <input type="submit" onClick={this.handleClick} value="Get your widget"/>
                    </div>

                    <div className="form">
                        <label>Add following code to your website </label><br/>
                        <textarea name="output" value={this.state.textbox} readOnly/>
                    </div>
                </form>
            </div>
        )
    }
}