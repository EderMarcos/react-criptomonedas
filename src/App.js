import React, { Component } from 'react';
import bg from './bg.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    moneda: '',
    criptomoneda: '',
    resultado: {},
    cargando: false
  };

  getCotizacion = async data => {
    const { criptomoneda, moneda } = data;
    this.setState({ cargando: true }, () => setTimeout(() => this.setState({ cargando: false }), 500));

    await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`)
      .then(res => {
        this.setState({
          moneda: moneda,
          criptomoneda: criptomoneda,
          resultado: res.data.DISPLAY[criptomoneda][moneda],
        });
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={ bg } alt="logotipo" className="logotipo" />
          </div>
          <div className="one-half column">
            <h1>Cotiza criptomonedas al instante</h1>
            <Formulario onSelect={ this.getCotizacion } />
            <Resultado resultado={ this.state } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
