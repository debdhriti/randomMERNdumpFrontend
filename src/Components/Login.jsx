import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REACT_APP_BACKEND_BASE } from './services/api';


export function Login({ SetLoggedIn }) {
    const navigate = useNavigate()
    const [form, SetForm] = useState({});

    const handleChange = (e) => {
        SetForm(oldForm => {
            return {
                ...oldForm,
                [e.target.name]: e.target.value,
            }
        })
    }
    const handleSubmit = async (e) => {
        console.log("been pressed", form)
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_BACKEND_BASE}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            console.log(data)
            if (data.token) {
                localStorage.setItem('token', data.token);
                SetLoggedIn(true)
                if (data.redirect) {
                    navigate(data.redirect)
                    navigate(0)
                }
            }
        } catch (e) {
            //Render an error page
            throw new Error(e.message);
        }
    }
    return (
        <form className="flex items-center h-screen w-screen" onSubmit={handleSubmit}>
            <Card className="w-96 mx-auto">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Log In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" size="lg" type="email" name="email" onChange={handleChange} />
                    <Input label="Password" size="lg" type="password" name="password" onChange={handleChange} />
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" type="submit" fullWidth>
                        Log In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Link to="/signup">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Sign up
                            </Typography>
                        </Link>
                    </Typography>
                </CardFooter>
            </Card>
        </form>
    );
}

export default Login