import React, { Component } from 'react';
import Spinner from './Spinner';

class Resultado extends Component {
  render() {
    const { resultado, cargando } = this.props.resultado;

    if (Object.entries(resultado).length === 0) return null;
    if (cargando) return <Spinner />;

    return (
      <div className="resultado">
        <h2>Resultado</h2>
        <p className="precio">El precio es: <span>{ resultado.PRICE }</span> </p>
        <p>Maximo: <span>{ resultado.HIGHDAY }</span> </p>
        <p>Minimo: <span>{ resultado.LOWDAY }</span> </p>
        <p>Variacion: <span>% { resultado.CHANGEPCT24HOUR }</span> </p>
        <p>Ultima actualizacion: <span>{ resultado.LASTUPDATE }</span> </p>
      </div>
    );
  }
}

export default Resultado;
