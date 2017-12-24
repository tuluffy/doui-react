import React, {Component} from 'react';
import Dialog from './components/Dialog';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleText: '提示信息',
            context: '拦路雨偏似雪花，饮泣的你冻吗？',
            handleTheme: ['确认', '取消'],
        };

        this.__$_handleFn = this.__$_handleFn.bind(this);
        this.$alert = this.$alert.bind(this);
    };

    $alert() {
        Dialog.Alert(this.state.titleText, this.state.context, this.state.handleTheme, this.__$_handleFn);
        // Dialog.Confirm(this.state.titleText, this.state.context, this.state.handleTheme, [this.__$_handleFn, this.__$_handleFn]);
        // Dialog.Toast('toast信息', 2000);
    };

    __$_handleFn() {
        alert('我是回调函数!');
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
