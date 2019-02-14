import React, {
    Component
} from 'react';
import './App.css';


class Mpp extends Component {
    render() {
        return (
            <div className="app">
                <Btn name="区县系统" class="btn one" />
                <Btn name="高校系统" class="btn two" />
                <Btn name="城市系统" class="btn three" />
            </div>
        );
    }
}

class Btn extends Component {
    render() {
        return (
            <div className={this.props.class} 
            onClick={() => {
                console.log(123)
                localStorage.setItem('system', this.props.name);
                //window.location.hash = '#/choose';
                console.log(123)
            }}>
                {this.props.name}
            </div>
        )
    }
}

//export default App;