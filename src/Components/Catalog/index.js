import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'

const CatalogComponent = ({ match: { url }, tickets, numRows, AddtoCart }) =>
    <Fragment>
        {/*TITLE*/}
        <DocumentTitle title='Paquetes Turisticos'></DocumentTitle>

        {/*HEADER*/}
        <div className="sticky-top sticky-nav">
            <div className="row text-center">
                <div className="col-md title">
                    <h1>Paquetes Turisticos</h1>
                </div>
            </div>
            <div className="row">
                <div className="offset-md-10">
                    <Link to="/cart"><button type="button" className="btn btn-outline-dark">{numRows} Items in the Cart <i className="fas fa-shopping-cart"></i></button></Link>
                </div>
            </div><br />
        </div>

        {/*BODY*/}
        <div className="card-columns row">
            {tickets.map(({ idPaquete, nombre, image, costo, descripcion, duracion }) =>
                <div key={idPaquete} className="card col-md-4">
                    <div className="card-header">
                        <img className="card-img-top text-center" src={image} alt={"Logo of " + nombre} style={{ height: '200px' }}></img>
                    </div>
                    <div className="card-body">
                        <b>COSTO: $</b>{costo}<br />
                        <b>DURACION: </b>{duracion} dias<br /><br />
                        {descripcion}
                    </div>
                    <div className="card-footer"><h5 className="card-title text-center">{nombre}<Link to={`${url}`}> <i className="fas fa-cart-plus" onClick={() => AddtoCart(idPaquete, nombre, 1, costo)}></i></Link></h5></div>
                </div>
            )}
        </div>
    </Fragment>

export default CatalogComponent
