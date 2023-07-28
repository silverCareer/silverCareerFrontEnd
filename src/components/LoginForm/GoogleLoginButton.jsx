import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const GoogleLoginButton = () => {
    const clientId = '271340191041-5lmiijua50imb84ms5snb77dsuat3qln.apps.googleusercontent.com'
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={(err) => {
                        console.log(err); // 이 코드가 실행되면 콘솔에 에러 메시지가 출력됩니다.
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

// google:
//     CLIENT_ID: 271340191041-5lmiijua50imb84ms5snb77dsuat3qln.apps.googleusercontent.com
//     CLIENT_SECRET: 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
export default GoogleLoginButton