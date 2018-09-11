import React, { Component, Fragment } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import Catalog from './Catalog'
import Cart from './Cart'

//LANDING PAGE
function Homebody() {
    return (
        <div>
            <div className="sticky-top sticky-nav">
                <div className="row text-center">
                    <div className="col-md title">
                        <h1>Landing Page</h1><br />
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <DocumentTitle title='Home'></DocumentTitle>
                <Link to="/catalog" className="text-center"><button type="button" className="btn btn-outline-dark">CLICK ME TO CONTINUE</button></Link>
            </div>
        </div>
    )
}
class App extends Component {
    /*Constructor*/
    constructor(cart) {
        super(cart)
        this.state = {
            tickets: [],
            cart: [],
            total: 0
        }
        this.DeletefromCart = this.DeletefromCart.bind(this)
        this.AddtoCart = this.AddtoCart.bind(this)
    }

    /*Fetch Backend data*/
    async componentDidMount() {
        const tickets = await (await fetch('http://localhost/server-app/paquetes.php')).json()
        this.setState({ tickets })
        const cart = await (await fetch('http://localhost:3004/cart')).json()
        this.setState({ cart })
    }

    /*Delete from Cart*/
    DeletefromCart(idPaquete, costo) {
        const cart = this.state.cart
        var total = this.state.total
        const filtered = cart.filter(cart => {
            return cart.idPaquete !== idPaquete;
        })
        this.setState({ cart: filtered })
        // eslint-disable-next-line
        total = total - parseInt(costo)
        this.setState({ total })
    }

    /*Add to Cart*/
    AddtoCart(idPaquete, nombre, quantity, costo) {
        const cart = this.state.cart
        var total = this.state.total
        const itemexists = cart.find(nombre => nombre.idPaquete === idPaquete)
        if (!itemexists) {
            cart.push({
                idPaquete,
                nombre,
                quantity,
                costo
            })
            // eslint-disable-next-line
            total = parseInt(costo) + total
        }
        else {
            alert("El paquete ya esta en tu carrito")
        }
        this.setState({ cart })
        this.setState({ total })
    }

    render() {
        /*Set Variables from states*/
        const { tickets } = this.state
        const { cart } = this.state
        const { total } = this.state


        /*Count items length*/
        const membersToRender = this.state.cart
        const numRows = membersToRender.length

        /*Page*/
        return <BrowserRouter>
            <Fragment>
                {/*LANDING*/}
                <Route exact path="/" component={Homebody} />

                {/*CATALOG*/}
                <Route exact path="/catalog" render={
                    props => <Catalog {...props} tickets={tickets} numRows={numRows} AddtoCart={this.AddtoCart} />
                } />

                {/*CART*/}
                <Route exact path={`/cart`} render={
                    props => <Cart {...props} cart={cart} total={total} numRows={numRows} DeletefromCart={this.DeletefromCart} />
                } />
            </Fragment>
        </BrowserRouter>
    }
}

export default App
