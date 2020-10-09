import React from 'react';
import Button from 'react-bootstrap/Button';
import "./style.css"

function Buttons(props) {



    return (
        <div id="button1">
            <Button

                variant="outline-dark"
                href={props.href}

            >
                {props.label}</Button>{' '}
        </div>
    )
}

export default Buttons;
