import React, { Component } from 'react';
import './index.css';

export default class Alert extends Component {
    constructor(props){
        super(props);

        this.state = {

        };

        this.confirm = this.confirm.bind(this);
    };

    confirm(fn){
        const maskContainer = document.querySelector('#maskContainer');
        document.body.removeChild(maskContainer);

        const mask = document.querySelector('.mask');
        if(!mask){
            fn();
        }
    };

    render(){
        const { titleText, context, cbFn } = this.props;
        return (
            <div className="mask">
                <div className="container">
                    <div className="content">
                        {
                            titleText ? <div className="title">{titleText}</div> : null
                        }

                        <div className="context">{context}</div>
                    </div>

                    <div className="handle" onClick={()=>this.confirm(cbFn)}>
                        确认
                    </div>
                </div>
            </div>
        )
    };
};