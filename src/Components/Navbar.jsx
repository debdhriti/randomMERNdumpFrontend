import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
    Input
} from "@material-tailwind/react";

export default function FoodNavbar({ loggedIn, SetLoggedIn, search, cart, open, orders }) {
    const navigate = useNavigate()
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const totalItems = () => {
        let ans = 0;
        console.log(cart)
        Object.keys(cart).map(el => {
            console.log(el)
            Object.keys(cart[el]).map(cnt => {
                ans += Number(cart[el][cnt]);
            })
        })
        console.log(ans)
        return ans;
    }

    const handleLogout = async () => {
        try {
            const response = await fetch(`${BACEND_BASE}/logout`);
            const data = await response.json();
            SetLoggedIn(false)
            localStorage.removeItem('token')
            cart.setCart(old => { })
            orders.SetOrders(old => { })
            if (data.redirect) {
                navigate(data.redirect)
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    return (
        <Navbar className="z-40 bg-navcolor fixed w-full top-0 left-0 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex space-between text-blue-gray-900">
                <Link to="/">
                    <Typography
                        className="text-xl text-white mr-4 cursor-pointer py-1.5 font-medium"
                    >

                        FlipFood
                    </Typography>
                </Link>
                <Link to="/orders">
                    <div
                        variant="gradient"
                        size="sm"
                        className="hidden lg:inline-block text-white mx-3 mt-2"
                    >
                        <span>My orders</span>
                    </div>
                </Link>
                <div className="hidden items-center gap-x-2 lg:flex ml-auto">
                    <div className="relative flex w-full gap-2 md:w-max">
                        {loggedIn && <><Input
                            type="search"
                            placeholder="Search what you're looking for"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                            className="text-white !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-grey-300"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => {
                                search.SetSearch(e.target.value);
                            }}
                        />
                            <div className="!absolute left-3 top-[13px]">
                                <svg
                                    width="13"
                                    height="14"
                                    viewBox="0 0 14 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                        fill="#CFD8DC"
                                    />
                                    <path
                                        d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                        stroke="#CFD8DC"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </>
                        }
                    </div>
                </div>
                {loggedIn && <IconButton onClick={() => open.setOpen(true)} color='gray' className="ml-auto mr-2">
                    <i className="fa fa-shopping-cart text-xl" />
                    <div class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalItems()}</div>
                </IconButton>}
                <div className="flex items-center gap-4">
                    {!loggedIn ? <div className="flex items-center gap-x-1">
                        <Link to="/login">
                            <Button
                                variant="text"
                                size="sm"
                                className="text-white hidden lg:inline-block"
                            >
                                <span>Log In</span>
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign up</span>
                            </Button>
                        </Link>
                    </div> :
                        <div className="flex relative items-center gap-x-1">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                                onClick={handleLogout}
                            >
                                <span>Log Out</span>
                            </Button>
                        </div>}
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                <div className="items-center gap-x-2 lg:flex m-3">
                    <div className="relative flex w-full gap-2 md:w-max">
                        {loggedIn &&
                            <>
                                <Input
                                    type="search"
                                    placeholder="Search what you're looking for"
                                    containerProps={{
                                        className: "min-w-[288px]",
                                    }}
                                    className="text-white !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-grey-300"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={(e) => {
                                        search.SetSearch(e.target.value);
                                    }}
                                />
                                <div className="!absolute left-3 top-[13px]">
                                    <svg
                                        width="13"
                                        height="14"
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                            fill="#CFD8DC"
                                        />
                                        <path
                                            d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                            stroke="#CFD8DC"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="m-3">
                    {!loggedIn ? <div className="flex items-center gap-x-1">
                        <Link to="/login">
                            <Button fullWidth variant="text" size="sm" className="">
                                <span>Log In</span>
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button fullWidth variant="gradient" size="sm" className="">
                                <span>Sign up</span>
                            </Button>
                        </Link>
                    </div>
                        :
                        <div className="flex items-center gap-x-1">
                            <Link to="/orders">
                                <Button fullWidth variant="gradient" size="sm" className="">
                                    <span>My orders</span>
                                </Button>
                            </Link>
                            <Button fullWidth variant="gradient" size="sm" className="" onClick={handleLogout}>
                                <span>Log out</span>
                            </Button>

                        </div>}
                </div>
            </MobileNav>
        </Navbar >
    );
}