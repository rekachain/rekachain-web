import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "../../Components/ui/button";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nip: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />
            <section className="login min-h-screen flex flex-col md:flex-row md:gap-32 px-24 md:px-32 items-center">
                <img
                    id="login-top-left"
                    src="/assets/images/login-top-left.png"
                    alt="login-top-left.png"
                />
                <img
                    id="login-bottom-left"
                    src="/assets/images/login-bottom-left.png"
                    alt="login-bottom-left.png"
                />
                <img
                    id="login-bottom-right"
                    src="/assets/images/login-bottom-right.png"
                    alt="login-bottom-right.png"
                />

                <div className="hero flex-1">
                    <img
                        className="h-full hidden md:block"
                        id="login-hero"
                        src="/assets/images/login-hero.png"
                        alt="login-hero.png"
                    />
                </div>
                <div className="flex-1 z-10">
                    <img
                        src="/assets/images/login-form-header.png"
                        alt="login-form-header"
                        className="h-32 mx-auto mb-5 object-contain"
                    />
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="nip" value="NIP" />

                            <Input
                                id="nip"
                                type="text"
                                name="nip"
                                value={data.nip}
                                className="mt-1"
                                autoComplete="nip"
                                autoFocus
                                onChange={(e) => setData("nip", e.target.value)}
                            />

                            <InputError message={errors.nip} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex mt-4 justify-between flex-col md:flex-row gap-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember me
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button className="w-full" disabled={processing}>
                                SIGN IN
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
