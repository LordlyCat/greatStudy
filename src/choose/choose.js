import React, {
    Component
} from 'react';
import './choose.css';

import ajax from '../ajax.js';

let aa = true;
let userData = {
    category_name: localStorage.getItem('system'),
    mechanism_name: '',
    branches_name: '',
    branch_node_name: '',
    name: '',
    age: '',
    job: ''
}

let resetFlag = false;

let selectedIndex = null;
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
            data: this.props,
            branchesKey: 0,
            coverStyle: {
                display: 'none'
            }
        }

        this.systemName = localStorage.getItem('system');
        if (!this.systemName) {
            this.systemName = '区县系统'
        }

        this.setCoverStyle = this.setCoverStyle.bind(this);
        this.setBranchesKey = this.setBranchesKey.bind(this);
    }
    setCoverStyle() {
        console.log(aa);
        if (!aa) {
            return false;
        }
        if (this.state.coverStyle.display === 'none') {
            if (userData.mechanism_name === '' ||
                userData.branches_name === '') {
                alert("请选择完毕信息")
                return false;
            }
            this.setState({
                coverStyle: {
                    display: 'block'
                }
            })
            console.log(userData)
        } else {
            this.setState({
                coverStyle: {
                    display: 'none'
                }
            })
        }
    }
    setBranchesKey(key) {
        resetFlag = true;
        userData.branches_name = '';
        this.setState({
            branchesKey: key
        }, () => {
            console.log('key:', key)
        })
    }
    render() {
        //console.log(localStorage.getItem('selectData'))
        let data = JSON.parse(localStorage.getItem('selectData'));
        //console.log('data', data)
        if (data == undefined) {
            return (
                <div id="choose">
                <div className="systemName">{this.systemName}</div>
                    <h3>网络延迟，数据加载错误，请返回上一页或入口重试</h3>
                </div>
            )
        }
        
        let newData = {};
        
        let mechanisms = data.mechanisms.map(element => element.mechanism_name);
        let branches_name = data.mechanisms[this.state.branchesKey].branches.map(element => element.branches_name)

        return (
            <div id="choose">
                <div className="systemName">{this.systemName}</div>
                <DropBox classname="dropWrapper firstBox" 
                data={mechanisms}
                initialization='--直属团组织--' 
                setBranchesKey={this.setBranchesKey}/>
                <DropBox classname="dropWrapper secondBox" 
                data={branches_name}
                initialization="请选择" />
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
            selected: this.props.initialization,
            initialization: this.props.initialization,
            moveFlag: false,
            zIndex: 1,
            branchesKey: null
        }

        this.branchesKey = [];
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
            if (this.state.initialization === '--直属团组织--') {
                this.setState({
                    branchesKey: userData.mechanism_name
                })
            }
            setTimeout(function() {
                aa = true;
            }, 600)
        }
    }
    setSelected(value) {
        this.setState({
            selected: value
        })
    }
    render() {
        let showContent = null;
        if (!this.state.showList) {
            if (this.state.selected === this.state.initialization) {
                showContent = this.state.initialization;
            } else {
                showContent = this.state.selected;
                if (this.state.initialization === '请选择') {
                    if (resetFlag) {
                        showContent = this.state.initialization;
                        resetFlag = !resetFlag;
                    } else {
                        userData.branches_name = showContent;
                    }
                    
                } else {
                    userData.mechanism_name = showContent;
                }
            }

        } else {
            console.log(this.props.data)
            if (this.props.data.length && this.props.data.length === 1) {
                showContent = this.props.data[0];
                if (this.state.initialization === '请选择') {
                    userData.branches_name = showContent;
                } else {
                    userData.mechanism_name = showContent;
                }
                aa = true;
                console.log('haha')
            } else {
                console.log('es')
                showContent = <SelectInput classname="selectInput" 
                childSelect={this.props.data}
                setSelected={this.setSelected} 
                setBranchesKey={this.props.setBranchesKey}/>
            }
            
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
            //console.log(index);
            return (
                <ValueBox value={value} 
                myKey={index} 
                key={index}
                setSelected={this.props.setSelected} 
                setBranchesKey={this.props.setBranchesKey} />
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
        if (this.props.setBranchesKey) {this.props.setBranchesKey(this.props.myKey)}
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
            job: '',
            tzb: ''
        }
        this.getName = this.getName.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getJob = this.getJob.bind(this);
        this.getTzb = this.getTzb.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    getName(e) {
        this.setState({
            name: e.target.value
        })
        userData.name = e.target.value;
    }
    getAge(e) {
        this.setState({
            age: e.target.value
        })
        userData.age = e.target.value
    }
    getJob(e) {
        this.setState({
            job: e.target.value
        })
        userData.job = e.target.value
    }
    getTzb(e) {
        this.setState({
            tzb: e.target.value
        })
        userData.branch_node_name = e.target.value;
    }
    submitData() {
        userData.category_name = localStorage.getItem('system');
        console.log(userData);
        for (var value in userData) {
            
            if (userData[value].length === 0 || userData[value].replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) {
                alert('填写内容不能为空')
                return false;
            }
            //console.log(userData[value]);
        }
        this.props.setCoverStyle()
        ajax.call(this, {
            url: '/admin/youth/uploadUserInfo',
            method: 'POST',
            async: true,
            data: userData,
            headers: {
                "Content-type": 'application/x-www-form-urlencoded'
            },
            //header: 'application/json',
            success: (data) => {
                console.log('upload:', userData);
                alert('提交成功');
                window.location.href = 'http://test.shingdstar.com/admin/youth/cyol';
            },
            error: (err) => {
                alert(err)
                console.log(err);
            }
        })
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
                    <div className="nameWrapper">
                        <p>团支部：</p>
                        <input type="text" 
                            className="name" 
                            value={this.state.tzb}
                            onChange={this.getTzb} />
                    </div>
                    <div className="submit" onTouchEnd={this.submitData}>提交</div>
                </div>
            </div>
        )
    }
}

export default Choose;