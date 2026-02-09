import { getServerMode } from "@/@core/utils/serverHelpers";
import Login from "@/components/pages/auth/login/Login";

 async function LoginPage() {
    const mode = await getServerMode();

    return (
        <Login mode={mode} />
    )

}

export default LoginPage;
