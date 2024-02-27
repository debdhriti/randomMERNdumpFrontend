import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'
import categoryJSON from "../../foodCategory.json"
import foodJSON from "../../foodData2.json"
import ItemCard from './ItemCard'
import { v4 as uuidv4 } from 'uuid';
import Cart from './Cart'

const Home = ({ orders, cart, search, open }) => {
    return (
        <div>
            <Cart open={open} cart={cart}></Cart>
            {search === "" && <div className='z-10 w-screen'>
                <Carousel></Carousel>
            </div>}
            <div className={`px-4 mx-10 justify-between z-50 -screen ${search === "" ? "mt-10" : ""}`}>
                {categoryJSON.map(el => {
                    const newSearch = search.toLowerCase();
                    return (
                        <div key={uuidv4()} className='mt-10'>
                            {el.CategoryName.toLowerCase().includes(newSearch) && <h1 className='z-10 left-0 mb-2'>{el.CategoryName}</h1>}
                            <div>
                                <div className='flex flex-wrap'>
                                    {foodJSON.map((foodItem, index) => {
                                        if (newSearch !== "" && !foodItem.CategoryName.toLowerCase().includes(newSearch) && !foodItem.name.toLowerCase().includes(newSearch))
                                            return null;
                                        return (<div key={uuidv4()}>{foodItem.CategoryName === el.CategoryName && <ItemCard orders={orders} cart={cart} key={uuidv4()} name={foodItem.name} img={foodItem.img} options={foodItem.options} description={foodItem.description} />}</div>);

                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Home