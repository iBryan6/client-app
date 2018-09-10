import React, { Fragment } from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'

const CartComponent = ({ cart, DeletefromCart, total }) =>

    <Fragment>
        {/*TITLE*/}
        <DocumentTitle title='Cart'></DocumentTitle>

        {/*HEADER*/}
        <div className="sticky-top sticky-nav">
            <div className="row text-center">
                <div className="col-md title">
                    <h1>Cart</h1>
                    <Link to="/catalog"><kbd><i className="fas fa-chevron-left"></i> GO BACK</kbd></Link>
                </div>
            </div><br />
        </div>

        {/*BODY*/}
        <div className="container">
            <table className="table" id="cart-table">
                <thead>
                    <tr>
                        <th scope="col">nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">costo</th>
                        <th scope="col">SubTotal</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(({ id, nombre, quantity, costo }) =>
                        <tr key={id} >
                            <td><i className="fas fa-ticket-alt"></i> {nombre} - Concert Ticket</td>
                            <td>{quantity}</td>
                            <td>${costo}</td>
                            <td>${quantity * costo}</td>
                            <td><button type="button" onClick={() => DeletefromCart(id, costo)} className="btn btn-sm btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="offset-md-8">
                <h2>Total: {total}</h2>
            </div>
        </div>
    </Fragment>

export default CartComponent