import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Dialog extends PureComponent {
    constructor(props) {
        super(props);

        this.$createAlertModel = this.$createAlertModel.bind(this);
        this.$createConfirmModel = this.$createConfirmModel.bind(this);
        this.$createToastModel = this.$createToastModel.bind(this);

        this.$handleCb = this.$handleCb.bind(this);
        this.__UI_removeToast = this.__UI_removeToast.bind(this);
    };

    //回调函数
    $handleCb(fn) {
        const unMountStatue = this.__UI_removeToast();

        if (unMountStatue) {
            fn();
        }
    };

    //移除mask
    __UI_removeToast() {
        const maskContainer = document.querySelector('#maskContainer');

        /**
         * 1.使用removeChild移除真实的DOM，该操作不会触发componentWillUnmount函数
         * 2.unmountComponentAtNode只会移除vm中的DOM，用来触发该操作不会触发componentWillUnmount函数
         * */
        document.body.removeChild(maskContainer);

        return ReactDOM.unmountComponentAtNode(maskContainer);
    };

    componentDidMount() {
        // 针对toast进行的定时操作
        const {type, time} = this.props;

        if (type === 'toast') {
            const setTime = time ? time : 3000;

            this.timer = setTimeout(() => {
                this.__UI_removeToast();
            }, setTime)
        }
    };

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

    };

    $createAlertModel(title, context, handleTheme, handleFn) {
        return (
            <div className="dialog-mask">
                <div className="dialog-container">
                    <div className="dialog-content">
                        {
                            title ? <div className="dialog-title">{title}</div> : null
                        }

                        <div className="dialog-context">{context}</div>
                    </div>

                    <div className="alert-handle" onClick={() => this.$handleCb(handleFn)}>
                        {handleTheme}
                    </div>
                </div>
            </div>
        )
    };

    $createConfirmModel(title, context, handleTheme, handleFn) {
        return (
            <div className="dialog-mask">
                <div className="dialog-container">
                    <div className="dialog-content">
                        {
                            title ? <div className="dialog-title">{title}</div> : null
                        }

                        <div className="dialog-context">{context}</div>
                    </div>

                    <div className="confirm-handleContainer">
                        <div className="confirm-handle" onClick={() => this.$handleCb(handleFn[0])}>
                            {handleTheme[0]}
                        </div>
                        <div className="confirm-handle confirm-handle-right"
                             onClick={() => this.$handleCb(handleFn[1])}>
                            {handleTheme[1]}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    $createToastModel(title) {
        return (
            <div className="toast-mask">
                <div className="toast-container">
                    <div className="toast-context">{title}</div>
                </div>
            </div>
        )
    };

    render() {
        const {type, title, context, handleTheme, handleFn, time} = this.props;

        if (type === 'alert') {
            return this.$createAlertModel(title, context, handleTheme, handleFn);
        }

        if (type === 'confirm') {
            return this.$createConfirmModel(title, context, handleTheme, handleFn);
        }

        if (type === 'toast') {
            return this.$createToastModel(title, time);
        }
    };
};

Dialog.rewrite = (type, title, context, handleTheme, handleFn) => {
    let maskContainer = document.createElement('div');

    maskContainer.id = 'maskContainer';
    document.body.appendChild(maskContainer);

    ReactDOM.render(<Dialog type={type} title={title} context={context} handleTheme={handleTheme}
                            handleFn={handleFn}/>, maskContainer);
};


Dialog.Alert = (title, context, handleTheme, handleFn) => {
    Dialog.rewrite('alert', title, context, handleTheme, handleFn);
};

Dialog.Confirm = (title, context, handleTheme, handleFn) => {
    Dialog.rewrite('confirm', title, context, handleTheme, handleFn);
};

Dialog.Toast = (title, time) => {
    Dialog.rewrite('toast', title, time);
};