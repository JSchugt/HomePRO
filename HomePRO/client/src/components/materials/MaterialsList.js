import React, { useEffect, useState } from "react"
import { getMaterialsByUserId } from "../../modules/materialsManager"
import firebase from "firebase/app";
export const MaterialsList = () => {
    const [inventory, setInventory] = useState([])
    const [totalPrice, setTotalPrice] = useState()


    const getInvenotry = () => {
        getMaterialsByUserId(firebase.auth().currentUser.uid).then((resp) => {
            setInventory(resp)

        })
    }

    const sumInventory = () => {
        // inventory.forEach((item) => {
        //     console.log(item.price, item.qty)
        //     let temp = item.price * item.qty + totalPrice
        //     setTotalPrice(temp)

        // })
        const sum = inventory.reduce((a, v) => a = a + v.price * v.qty, 0)

        setTotalPrice(sum / 100)
    }

    useEffect(() => {
        getInvenotry()
    }, [])
    useEffect(() => {
        sumInventory()
    }, [inventory])

    return (<div>
        <h1>MaterialsList</h1>
        {inventory.map((item) => {
            return <div key={item.id}>
                <h3>{item.name}</h3>
                <div>${item.price / 100}</div>
                <div>{item.qty}</div>
                <div>${item.price / 100 * item.qty}</div>

            </div>
        })}
        <h3>Total ${totalPrice}</h3>
    </div>)
}