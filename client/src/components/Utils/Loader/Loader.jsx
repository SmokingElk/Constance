import loaderImg from "../../../assets/imgs/loader.svg";

const Loader = props => {
    let size = props.size ?? 20;
    return <img src={loaderImg} style={{width: size + "px", height: size + "px"}}/>
}

export default Loader;