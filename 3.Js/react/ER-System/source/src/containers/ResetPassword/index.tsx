import React from 'react';
import '../Login/style.scss';
import Logo from '../../assets/img/kobelco.png';
import TextBox from '../../components/Textbox';
import Button from '../../components/Button';
import * as Constant from '../../core/constant';
import { validate } from '../../core/extend';
import history from '../../history';
import * as API from '../../core/services';

interface Props {
    location: any;
}

interface State {
    newPassword: string;
    confirmPassword: string;
    resetPassSecretKey: string;
    messageError: any;
    loading: boolean;
    checked: boolean;
    [label: string]: any;
    checkKey: boolean;
}

interface CSSObject {

}

class ResetPassword extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newPassword: "",
            confirmPassword: "",
            resetPassSecretKey: props.location.pathname.split('/')[2] || "",
            messageError: {
                newPassword: "",
                confirmPassword: ""
            },
            loading: false,
            checked: false,
            checkKey: false,
        }
    }

    componentDidMount = async () => {
        const {resetPassSecretKey} = this.state;
        const checkSecretKey = await API.postApi("check-reset-pass-secret-key", {
            resetPassSecretKey: resetPassSecretKey
        })

        if ((checkSecretKey.status === 200 && checkSecretKey.data.http_code !== 200) || resetPassSecretKey.length === 0) {
            history.push({ pathname: '/' })
        } else {
            this.setState({ checkKey: true })
        }

    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const label = e.currentTarget.name,
            value = e.currentTarget.value;

        let error = "";

        if (value.length === 0 && this.state.checked) {
            if (label === "newPassword") {
                error = Constant.MESSAGE_CODE["005"];
            }

            if (label === "confirmPassword") {
                error = Constant.MESSAGE_CODE["006"];
            }
        }

        this.setState({ [label]: value, messageError: { ...this.state.messageError, [label]: error } });
    }


    handleSubmit = async () => {
        const { newPassword, confirmPassword, resetPassSecretKey, messageError } = this.state;
        const validPasswordNew = validate.validPasswordStrong(newPassword),
            validConfirm = validate.validPasswordConfirm(newPassword, confirmPassword),
            paramUser = {
                resetPassSecretKey,
                newPassword
            };
        let error = messageError;

        this.setState({ checked: true, loading: true });

        if (newPassword.length > 0 && confirmPassword.length > 0 && validPasswordNew && validConfirm) {
            const reset = await API.putApi("reset-password", paramUser)

            if (reset.status === 200 && reset.data.http_code === 200) {
                history.push({ pathname: '/' })
                return;
            }
        } else {
            error = {
                newPassword: newPassword.length === 0 ? Constant.MESSAGE_CODE["005"] : (!validPasswordNew ? Constant.MESSAGE_CODE["015"] : ""),
                confirmPassword: confirmPassword.length === 0 ? Constant.MESSAGE_CODE["006"] : (!validConfirm && validPasswordNew ? Constant.MESSAGE_CODE["007"] : "")
            }
        }

        this.setState({ loading: false, messageError: error });

    }

    render() {
        const { newPassword, confirmPassword, loading, messageError, checkKey } = this.state;

        return !checkKey ? null : (
            <div className="login">
                <div className="form">
                    <img className="logo" src={Logo} alt="Logo" />
                    <div style={{ textAlign: "center" }} onKeyDown={(e) => { if (e.keyCode === 13 && !loading) this.handleSubmit() }}>
                        <h2>RESET PASSWORD</h2>
                        <TextBox
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            placeholder="Enter your new password"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate" style={{ display: messageError.newPassword?.length > 0 } as Pick<CSSObject, keyof CSSObject>}>{messageError.newPassword}</p>
                        <TextBox
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm your new password"
                            disabled={loading}
                            onChange={(e) => this.handleChange(e)}
                        />
                        <p className="validate" style={{ display: messageError.confirmPassword?.length > 0 } as Pick<CSSObject, keyof CSSObject>}>{messageError.confirmPassword}</p>
                        <Button
                            value="Save new Password"
                            onClick={() => this.handleSubmit()}
                            disabled={loading}
                        />

                    </div>
                </div>
            </div>


        )
    }
}

export default ResetPassword
