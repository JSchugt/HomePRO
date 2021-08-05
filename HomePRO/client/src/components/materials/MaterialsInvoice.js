import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const MaterialsInvoice = ({ inventory, projectId }) => {
    // const [totalPrice, setTotalPrice] = useState()
    // const sumInventory = () => {
    //     const sum = inventory.reduce((a, v) => a = a + v.price * v.qty, 0)
    //     setTotalPrice(sum)
    // }
    const sum = inventory.reduce((a, v) => a + v.price * v.qty, 0)

    // useEffect(() => {

    //     sumInventory()
    // }, [totalPrice])
    return (
        <div className="maincard">
            <h1>Matherials List</h1>
            {sum > 0 &&
                <table>
                    <caption>Total Cost For Project Materials</caption>
                    <thead key={"InvoiceHead"}>
                        <tr key={"invoiceheaderwo"}>

                            <th key={"descriptionhead"}>Description</th>
                            <th key={"descriptionhead1"}>Price</th>
                            <th key={"descriptionhead3"}>Quantity</th>
                            <th key={"descriptionhead2"}>Item Total</th>
                        </tr>
                    </thead>
                    {inventory.map((item) => {
                        return <tbody key={item.id}>
                            <tr key={item.id + "body"}>
                                <td key={item.id + "bodyname"} className="cell">{item.name}</td>
                                <td key={item.id + "bodyprice"} className="cell price">${item.price}</td>
                                <td key={item.id + "bodyqty"} className="cell price">{item.qty}</td>
                                <td key={item.id + "bodytotal"} className="cell price">${(item.price * item.qty).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    })
                    }
                    <tbody>
                        <tr>
                            <td></td>
                            <td className="total">Total:</td>
                            <td></td>
                            <td className="total">${sum}</td>
                        </tr>
                    </tbody>
                    <button>
                        <Link to={`/Projects/${projectId}/materials/edit`} >
                            Edit Materials
                        </Link>
                    </button>
                </table>
            }
            {!sum >= 0 && <h2>No Materials Were Found</h2>}
        </div>

        // <h1>MaterialsList</h1>




    )
}