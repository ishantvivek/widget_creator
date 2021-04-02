import React from "react"


function MainContent(){
    return(
        <form>
            <h2> Enter Widget Details </h2>

            <div className="form">
                <label> Select State: </label>
                <select>
                    <option value="dummy1">Dummy1</option>
                    <option value="dummy2">Dummy2</option>
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
            <input type="submit" value="Get your widget" name="Get your widget" />
            </div>

        </form>
    )
}

export default MainContent