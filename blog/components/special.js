import { Space } from "antd"



function Special(props){
    return(
        <div className='special'>
            <span className='red'>javaScript</span>
            <span className='green'>html</span>
            <span className='blue'>css</span>
            <span className='origal'>python</span>
            <span className='qing'>算法</span>
            <span className='react'>React</span>
            <span>webpack</span>
            <span>node</span>
            <span className='count'>被访问{props.allCount}次</span>
        </div>
    )
}

export default Special