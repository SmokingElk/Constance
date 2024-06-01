import { useLocation, useNavigate, useParams } from "react-router-dom";

/*
Компонент, добавляющий в props объект для взаимодействия с путем в адресной строке.
 */

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
