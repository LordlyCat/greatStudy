import React, {
    Component
} from 'react';
import './choose.css';

import ajax from '../ajax.js';

let aa = true;

// let ajaxs = (opinion) => {
//     let opt = opinion;
//     let ajax = new XMLHttpRequest();
//     ajax.onreadystatechange = function() {
//         if (ajax.readyState === 4 && ajax.status === 200) {
//             var response = ajax.responseText;
//             opt.success(response);
//         }
//     };
//     ajax.open(opt.method, opt.url, opt.async);
//     ajax.setRequestHeader("Content-type", opt.header);
//     ajax.send(opt.data);
// }

//// "proxy": "http://193.112.183.206"
//193.112.183.206/BranchesTrees.json
class Choose extends Component {
    constructor() {
        super();

        // ajax({
        //     url: 'BranchesTrees.json',
        //     method: 'GET',
        //     async: true,
        //     headers: {
        //         "Content-type": 'application/json'
        //     },
        //     //header: 'application/json',
        //     success: (data) => {
        //         //unescape(str.replace(/\U/g, '%u'))
        //         console.log(JSON.parse(data))
        //     },
        //     error: (err) => {
        //         console.log(err);
        //     }
        // })
        this.state = {
            coverStyle: {
                display: 'none'
            }
        }

        this.systemName = localStorage.getItem('system');
        if (!this.systemName) {
            this.systemName = '区县系统'
        }

        this.setCoverStyle = this.setCoverStyle.bind(this);

    }
    setCoverStyle() {
        if (!aa) {
            return false;
        }
        if (this.state.coverStyle.display === 'none') {
            this.setState({
                coverStyle: {
                    display: 'block'
                }
            })
        } else {
            this.setState({
                coverStyle: {
                    display: 'none'
                }
            })
        }
    }
    render() {
        //console.log(localStorage.getItem('selectData'))
        //localStorage.getItem('selectData').mechanisms.
        return (
            <div id="choose">
                <div className="systemName">{this.systemName}</div>
                <DropBox classname="dropWrapper firstBox" 
                data={['haha1', '233', 'wawawa', '林克']} />
                <DropBox classname="dropWrapper secondBox" 
                data={['haha1', '233', 'wawawa', '林克']} />
                <DropBox classname="dropWrapper thirdBox" 
                data={['haha1', '233', 'wawawa', '林克']} />
                <NextBtn setCoverStyle={this.setCoverStyle} />

                <BulletBox style={this.state.coverStyle}
                setCoverStyle={this.setCoverStyle} />
            </div>)
    }
}

class DropBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            height: '7vw',
            selected: this.props.data[0],
            moveFlag: false,
            zIndex: 1
        }
        this.touchStartTime = null;
        this.show = this.show.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }
    touchStart() {
        this.touchStartTime = Date.parse(new Date());
        this.setState({
            zIndex: 9999
        })
    }
    show() {
        let timeDifference = Date.parse(new Date()) - this.touchStartTime;
        if (timeDifference > 40) {
            return false;
        }
        if (!this.state.showList && !this.state.moveFlag) {
            aa = false;
            let dataLength = this.props.data.length;
            if (dataLength <= 3) {
                this.setState({
                    height: dataLength * 7 + 'vw',
                    showList: true
                })
                aa = false;
            } else {
                this.setState({
                    height: '21vw',
                    showList: true
                })
                aa = false
            }
        } else if (this.state.showList && !this.state.moveFlag) {
            this.setState({
                height: '7vw',
                showList: false,
                zIndex: 1
            });
            setTimeout(function() {
                aa = true;
            }, 600)
        }
        console.log(aa)
    }
    setSelected(value) {
        this.setState({
            selected: value
        })
    }
    render() {
        let showContent = null;
        if (!this.state.showList) {
            showContent = this.state.selected;
        } else {
            showContent = <SelectInput classname="selectInput" 
            childSelect={this.props.data}
            setSelected={this.setSelected} />
        }
        return (
            <div className={this.props.classname} 
            style={{height: this.state.height,
                zIndex: this.state.zIndex}} 
            onTouchEnd={this.show}
            onTouchStart={this.touchStart} >
                {showContent}
            </div>
        )
    }
}

class SelectInput extends Component {
    constructor(props) {
        super(props);
        this.childSelect = this.props.childSelect;
        this.state = {
            selected: this.childSelect[0],
            backgroundColor: 'rgb(248, 248, 229)'
        }

    }

    render() {
        let valueArr = this.childSelect.map((value, index) => {
            return (
                <ValueBox value={value} key={index}
                setSelected={this.props.setSelected} />
            )
        })
        return (
            <div className={this.props.classname}>
                {valueArr}
            </div>)
    }
}

class ValueBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: 'rgb(248, 248, 229)'
        }

        this.touchStart = this.touchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }
    touchStart(e) {
        this.setState({
            backgroundColor: 'lightblue'
        })
    }
    onTouchEnd(e) {
        this.setState({
            backgroundColor: 'rgb(248, 248, 229)'
        })
        this.props.setSelected(this.props.value);
    }
    render() {
        return (
            <div className="valueBox" 
            style={{background: this.state.backgroundColor}} 
            onTouchStart={this.touchStart}
            onTouchEnd={this.onTouchEnd} >
                    {this.props.value}
            </div>
        )
    }
}

class NextBtn extends Component {
    render() {
        return (
            <div className="nextBtn" onClick={this.props.setCoverStyle}>下一步</div>
        )
    }
}

class BulletBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            age: '',
            job: ''
        }
        this.getName = this.getName.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getJob = this.getJob.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    getName(e) {
        this.setState({
            name: e.target.value
        })
    }
    getAge(e) {
        this.setState({
            age: e.target.value
        })
    }
    getJob(e) {
        this.setState({
            job: e.target.value
        })
    }
    submitData() {
        console.log(this.state.name);
        this.props.setCoverStyle()

    }
    render() {
        return (
            <div className="cover" style={this.props.style}>
                <div className="bullet">
                    <div className="cancel" 
                        onTouchEnd={this.props.setCoverStyle}>
                    </div>
                    <div className="nameWrapper">
                        <p>姓名：</p>
                        <input type="text" 
                            className="name" 
                            value={this.state.name}
                            onChange={this.getName} />
                    </div>
                    <div className="nameWrapper">
                        <p>年龄：</p>
                        <input type="text" 
                            className="name" 
                            value={this.state.age}
                            onChange={this.getAge} />
                    </div>
                    <div className="nameWrapper">
                        <p>职业：</p>
                        <input type="text" 
                            className="name" 
                            value={this.state.job}
                            onChange={this.getJob} />
                    </div>
                    <div className="submit" onTouchEnd={this.submitData}>提交</div>
                </div>
            </div>
        )
    }
}

export default Choose;