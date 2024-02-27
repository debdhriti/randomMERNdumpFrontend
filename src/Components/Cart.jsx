import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { IconButton } from "@material-tailwind/react";
import foodJSON from "../../foodData2.json"
import card from '@material-tailwind/react/theme/components/card';
import { REACT_APP_BACKEND_BASE } from './services/api';

export default function Cart({ open, cart }) {

    const cancelButtonRef = useRef(null)
    const handleClose = async (val) => {
        //event listener logic to be written here
        const token = localStorage.getItem('token');
        try {
            await fetch(`${REACT_APP_BACKEND_BASE}/savecart`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newCart: cart.cart,
                }),
            })
            console.log('closed')
            open.setOpen(val)
        } catch (err) {
            throw new Error(err)
        }
    }
    let total = 0;
    return (
        <Transition.Root show={open.open} as={Fragment}>
            <Dialog as="div" className="relative z-10 m-0 h-lg w-lg" initialFocus={cancelButtonRef} onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl h-lg pb-8 pt-0">
                                <div className="bg-white px-4 pb-4 pt-3 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Your Cart
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {Object.keys(cart.cart).map(item => {
                                                    return Object.keys(cart.cart[item]).map(plate => {
                                                        const valuePerItem = foodJSON.filter(el => el.name === item)[0]["options"][0][plate]
                                                        total += cart.cart[item][plate] * valuePerItem
                                                        return (<>

                                                            <div className='flex mr-3 justify-between'>
                                                                <div className="text-sm text-gray-500 p-0 mr-20">
                                                                    <b>Item:</b> {item} <b>Plate Size:</b> {plate} (x{cart.cart[item][plate]})
                                                                </div>
                                                                <IconButton onClick={() => {
                                                                    cart.SetCart(old => ({
                                                                        ...old,
                                                                        [item]: {
                                                                            ...old[item],
                                                                            [plate]: Math.max(0, old[item][plate] - 1),
                                                                        }
                                                                    }))
                                                                }} className='rounded-full ml-auto mr-2' color='red' size='sm' disabled={cart.cart[item][plate] === 0}>
                                                                    <i className='fas fa-minus'></i>
                                                                </IconButton>
                                                                <IconButton onClick={() => {
                                                                    cart.SetCart(old => ({
                                                                        ...old,
                                                                        [item]: {
                                                                            ...old[item],
                                                                            [plate]: old[item][plate] + 1,
                                                                        }
                                                                    }))
                                                                }} className='rounded-full ml-1 mr-5' color='green' size='sm'>
                                                                    <i className='fas fa-plus'></i>
                                                                </IconButton>
                                                                <div className='ml-20 text-black'><b>Rs.</b>{cart.cart[item][plate] * valuePerItem}</div>
                                                            </div>
                                                            <hr class="border-b border-gray-400 mb-2" />
                                                        </>)
                                                    })
                                                })}
                                                <div className='flex mr-3 justify-between'>
                                                    <div className="text-sm text-gray-500 p-0 mr-20 flex-row">
                                                        <b>Total GST</b>(2.5%):
                                                    </div>
                                                    <div className='ml-20 text-black'><b>Rs.</b>{(total * 2.5) / 100}
                                                    </div>
                                                </div>

                                                <hr class="border-b border-gray-400 mb-2" />
                                                <div className='flex mr-3 flex-row-reverse'>
                                                    <div className='ml-auto text-black'><b>Rs.</b><b>{total += (total * 2.5) / 100}</b></div>
                                                    <div className='mr-auto mr-10 mt-0.25 text-black text-xl'><b>Total</b></div>
                                                </div>
                                                <hr class="border-b border-gray-400 mb-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Link to='/payment'>
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => handleClose(false)}
                                        >
                                            Checkout
                                        </button>
                                    </Link>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => handleClose(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
