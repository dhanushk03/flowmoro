import React from "react";

const StudyLogItem = (props) => {
    return (
        <div>
            <h3>{props.date}</h3>
            <div>
                {Object.keys(props.session[0]).map((key) => {
                    <p>{`${key} - ${props.session[0][key]}`}</p>
                })}
            </div>
        </div>
    );
}

export default StudyLogItem;