import React, {
    Component
} from 'react';
import './home.css';
import ajax from '../ajax.js';


var verificationCookie = (cookie) => {
    let flag = false;
    let expire = false;
    let cookieArr = cookie.split('; ');
    for (let variable of cookieArr) {
        console.log(variable.split('='));
        if (variable.split('=')[0] === '_tk') {
            flag = true;
        }
        if (variable.split('=')[0] === 'expire' && parseInt(variable.split('=')[1]) * 1000 > Date.parse(new Date())) {
            expire = true;
        }
    }
    //console.log(flag, expire)
    return flag && expire;
}

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: ''
        }
    }
    componentWillMount() {
        if (!verificationCookie(document.cookie)) {

            window.location.href = 'http://study.redrock.team/admin/youth/hello';
            return false;
        }
        ajax.bind(this)({
            url: '/BranchesTrees.json',
            method: 'GET',
            async: true,
            headers: {
                "Content-type": 'application/json'
            },
            //header: 'application/json',
            success: (data) => {
                console.log(JSON.parse(data));
                this.setState({
                    data: JSON.parse(data)
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
                localStorage.setItem('selectData', JSON.stringify(this.props.data));
                window.location.hash = 'choose';
                console.log(this.props.data)
            }}>
                {this.props.name}
            </div>
        )
    }
}

export default Home;