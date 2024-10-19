import { BsFillExclamationOctagonFill, BsHeadphones, BsFillPatchQuestionFill } from "react-icons/bs"

function AuthAdditional() {
    return (
        <div className="auth-additional">
            <BsFillExclamationOctagonFill className="auth-additional__icon"/>
            <BsHeadphones className="auth-additional__text-icon"/>
            <p className="auth-additional__text">
            The game features occasional sounds, which can be muted in the settings.
            </p>
            <BsFillPatchQuestionFill className="auth-additional__text-icon"/>
            <p className="auth-additional__text">If you want to know more visit <span style={{fontWeight: 'bold'}}>Info</span> tab in the game or click button below</p>
            <button className="auth-additional__button"> More Info </button>
        </div>
    );
};

export default AuthAdditional;