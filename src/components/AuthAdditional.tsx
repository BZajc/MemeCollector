import { BsFillPatchQuestionFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";

function AuthAdditional() {
    const navigate = useNavigate()

    const infoButton = () => {
        navigate("/info")
    }

    return (
        <div className="auth-additional">
            <BsFillPatchQuestionFill className="auth-additional__text-icon"/>
            <p className="auth-additional__text">If you want to know more visit <span style={{fontWeight: 'bold'}}>Info</span> tab in the game or click button below</p>
            <button className="auth-additional__button" onClick={infoButton}> More Info </button>
        </div>
    );
};

export default AuthAdditional;