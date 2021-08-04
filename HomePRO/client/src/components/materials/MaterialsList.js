import React, { useEffect, useState } from "react"
import { getMaterialsByUserId } from "../../modules/materialsManager"
import firebase from "firebase/app";
import './materials.css'


export const MaterialsList = () => {
    const [inventory, setInventory] = useState([])
    const [totalPrice, setTotalPrice] = useState()

    const getInvenotry = () => {
        const currentUser = firebase.auth().currentUser.uid
        getMaterialsByUserId(currentUser).then((resp) => {
            setInventory(resp)

        })
    }

    const sumInventory = () => {
        // inventory.forEach((item) => {
        //     let temp = item.price * item.qty + totalPrice
        //     setTotalPrice(temp)

        // })
        const sum = inventory.reduce((a, v) => a = a + v.price * v.qty, 0)

        setTotalPrice(sum)
    }

    useEffect(() => {
        getInvenotry()
    }, [id])
    useEffect(() => {
        sumInventory()
    }, [totalPrice])

    return (<div>
        {/* <h1>MaterialsList</h1>
        {console.log(inventory.length, "length")}
        <table>
            <caption>Total Inventory Cost</caption>
            <tr>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Item Total</th>
            </tr>
            {inventory.map((item) => {
                return <tr key={item.id}>
                    <td className="cell">{item.name}</td>
                    <td className="cell price">${item.price / 100}</td>
                    <td className="cell price">{item.qty}</td>
                    <td className="cell price">${item.price * item.qty}</td>
                </tr>
            })}
            <tr>
                <td></td>
                <td className="total">Total</td>
                <td ></td>
                <td className="total">${totalPrice}</td>
            </tr> */}

        {/* </table> */}

    </div>)
}