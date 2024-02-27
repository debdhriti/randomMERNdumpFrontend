import { Fragment, useState, useRef, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { IconButton } from "@material-tailwind/react";
import { v4 as uuidv4 } from 'uuid';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function DropDown({ name, options, orders }) {

    const [isOpen, setIsOpen] = useState(localStorage.getItem(`${name}_menu`) === null ? false : JSON.parse(localStorage.getItem(`${name}_menu`)));
    const wrapperRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                localStorage.setItem(`${name}_menu`, JSON.stringify(false))

            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <Menu ref={wrapperRef} as="div" className="z-1 relative inline-block text-left m-0 p-0">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => {
                    setIsOpen(!isOpen);
                    localStorage.setItem(`${name}_menu`, JSON.stringify(!isOpen))
                }}>
                    Serving Sizes
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                show={isOpen}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="z-1 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {Object.keys(options[0]).map(el => {
                            return (
                                <Menu.Item key={uuidv4()}>
                                    {({ active }) => (
                                        <div className='flex justify-between m-2 ml-4'>
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm', "pointer-events-none cursor-not-allowed"
                                                )}
                                            >
                                                {el[0].toUpperCase() + el.substring(1, el.length)} Plate: {options[0][el]}
                                            </a>
                                            <IconButton disabled={!orders?.orders?.hasOwnProperty(name) || !orders.orders[name].hasOwnProperty(el) || (orders.orders[name][el] === 0)} onClick={(e) => {
                                                e.preventDefault();
                                                orders.SetOrders(oldOrders => {
                                                    const newOrders = { ...oldOrders };
                                                    if (!orders.orders.hasOwnProperty(name)) {
                                                        newOrders[name] = {}
                                                    }
                                                    if (!orders.orders[name] || !orders.orders[name].hasOwnProperty(el)) {
                                                        newOrders[name][el] = 0;
                                                    }
                                                    newOrders[name][el] = Math.max(newOrders[name][el] - 1, 0);
                                                    console.log(newOrders)
                                                    return newOrders;
                                                })
                                            }} className='rounded-full disabled:bg-grey' color='red'>
                                                <i className="fas fa-minus" />
                                            </IconButton>
                                            <div className='m-2 text-lg'>{((orders.orders && orders.orders.hasOwnProperty(name)) && (orders.orders[name].hasOwnProperty(el))) ? orders.orders[name][el] : 0}</div>
                                            <IconButton onClick={(e) => {
                                                e.preventDefault();
                                                orders.SetOrders(oldOrders => {
                                                    const newOrders = { ...oldOrders };
                                                    if (!orders.orders.hasOwnProperty(name)) {
                                                        newOrders[name] = {}
                                                    }
                                                    if (!orders.orders[name] || !orders.orders[name].hasOwnProperty(el)) {
                                                        newOrders[name][el] = 0;
                                                    }
                                                    newOrders[name][el] = newOrders[name][el] + 1;
                                                    console.log(newOrders)
                                                    return newOrders;
                                                })
                                                localStorage.setItem(`${name}_menu`, JSON.stringify(isOpen))
                                            }} className='rounded-full' color='green'>
                                                <i className="fas fa-plus" />
                                            </IconButton>
                                        </div>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
