import React, {
    Component
} from 'react';
import './home.css';
import ajax from '../ajax.js';



class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: ''
        }
    }
    componentWillMount() {
        ajax.bind(this)({
            url: 'BranchesTrees.json',
            method: 'GET',
            async: true,
            headers: {
                "Content-type": 'application/json'
            },
            //header: 'application/json',
            success: (data) => {
                //unescape(str.replace(/\U/g, '%u'))
                this.setState({
                    //data: JSON.parse(data)
                })
            },
            error: (err) => {
                console.log(err);
            }
        })

    }
    render() {
        console.log(this.state.data[0])
        return (
            <div className="home">
                <Btn name="区县系统" class="btn one" data={this.state.data[0]} />
                <Btn name="高校系统" class="btn two" data={this.state.data[1]} />
                <Btn name="城市系统" class="btn three" data={this.state.data[2]} />
            </div>
        );
    }
}

class Btn extends Component {
    render() {
        return (
            <div className={this.props.class} 
            onClick={() => {
                localStorage.setItem('system', this.props.name);
                localStorage.setItem('selectData', this.props.data);
                console.log(this.props.data)
                window.location.hash = 'choose';
            }}>
                {this.props.name}
            </div>
        )
    }
}

export default Home;