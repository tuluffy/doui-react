import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Alert from './components/AlertComp/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleText: '提示',
            context: '拦路雨偏似雪花，饮泣的你冻吗？'
        };

        this.confirm = this.confirm.bind(this);
        this.$alert = this.$alert.bind(this);
    };

    $alert() {
        let maskContainer = document.createElement('div');
        maskContainer.id = 'maskContainer';
        document.body.appendChild(maskContainer);

        ReactDOM.render(<Alert titleText={this.state.titleText} context={this.state.context}
                               cbFn={this.confirm}/>, maskContainer);

    };

    confirm() {
        alert('wahah');
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <button onClick={this.$alert}>点我弹出层</button>
            </div>
        );
    }
}

export default App;
