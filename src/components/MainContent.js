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
            list.push({name: stateName})
        }
        console.log(dataset)
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
                    <label>Header Text: <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Header Background: <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Header Text Color: <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Footer Text: <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Footer Background: <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Footer Text Color: <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Width(in px): <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <label>Height(in px): <input type="text" name="name" /> </label>
                    </div>

                    <div className="form">
                    <button type="button">Get your Widget</button>
                    </div>
                </form>
            </div>
        )
    }
}