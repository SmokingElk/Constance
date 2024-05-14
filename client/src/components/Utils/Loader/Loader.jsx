import loaderWhiteImg from "../../../assets/imgs/loader_white.svg";
import loaderBlackImg from "../../../assets/imgs/loader_black.svg";

const Loader = (props) => {
    let showBlack = props.black ?? false;
    let size = props.size ?? 20;
    return (
        <img
            src={showBlack ? loaderBlackImg : loaderWhiteImg}
            style={{ width: size + "px", height: size + "px" }}
            alt=""
        />
    );
};

export default Loader;
