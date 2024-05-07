import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        let router = { location, navigate, params };

        return <Component {...props} router={router} />;
    };

    return ComponentWithRouterProp;
};

export default withRouter;
