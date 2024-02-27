import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import DropDown from "./DropDown";
import { REACT_APP_BACKEND_BASE } from './services/api';

export default function ItemCard({ name, img, options, description, orders, cart }) {
    const isAddToCartDisabled = () => {
        if (!orders.orders)
            return true;
        if (!orders.orders.hasOwnProperty(name))
            return true;
        let isNonZero = false;
        Object.keys(orders.orders[name]).map(el => {
            if (orders.orders[name][el] > 0) {
                isNonZero = true;
            }
        })
        return !isNonZero;
    }
    return (
        <Card className="w-64 mx-3 my-3">
            <CardHeader shadow={false} floated={false} className="h-64">
                <img
                    src={img}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        {name}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        Rs. {options[0]['full']}
                    </Typography>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                >
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-between pt-0">
                <DropDown name={name} className="m-3" options={options} orders={orders}></DropDown>
                <Button
                    disabled={isAddToCartDisabled()}
                    ripple={false}
                    className="text-xs m-1 p-1 bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    onClick={async () => {
                        const token = localStorage.getItem('token');
                        console.log(orders.orders)
                        const newCart = { ...cart.cart };
                        Object.keys(orders.orders[name]).map(el => {
                            if (!newCart.hasOwnProperty(name)) {
                                newCart[name] = {};
                            }
                            if (!newCart[name].hasOwnProperty(el)) {
                                newCart[name][el] = 0;
                            }
                            newCart[name][el] += orders.orders[name][el];
                        })
                        console.log(newCart)
                        const resposne = await fetch(`${REACT_APP_BACKEND_BASE}/savecart`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                newCart
                            }),
                        })
                        const data = await resposne.json();
                        console.log(data);
                        cart.SetCart(oldCart => {
                            return newCart
                        })
                        orders.SetOrders(oldOrders => {
                            return {
                                ...oldOrders,
                                [name]: {}
                            }
                        })
                    }}
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}