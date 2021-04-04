import React from 'react'
import fetchApi from '../utils/fetchApi'


export default class MainContent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            states : []
        }
    }

    async componentDidMount() {
        let list = [] , dataset = await fetchApi.get()
        dataset = dataset.data

        for(const stateName in dataset){
            list.push({name: stateName, statecode: dataset[stateName].statecode})
        }
        this.setState({states: list})
    }

    render() {
        return (
            <div>
                <form>
                    <h2> Enter Widget Details </h2>
                    <div className="form">
                        <label> Select State: </label>
                        <select>
                        {this.state.states.map((e, key) => {
                            return <option key={key} value={e.statecode}> {e.name}</option>
                        })}
                        </select>
                    </div>

                    <div className="form">
                    <label>Header Text: <input type="text" name="headerText" /> </label>
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
                    </div>

                    <div className="form">
                    <button type="button">Get your Widget</button>
                    </div>
                </form>
            </div>
        )
    }
}