import React, { Component } from 'react';

class Formulario extends Component {

  moneda = React.createRef();
  criptomoneda = React.createRef();

  state = {
    criptomonedas: [],
    error: false
  };

  componentDidMount() {
    this.getCoins();
  }

  getCoins = async () => {
    await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD')
      .then(res => res.json())
      .then(res => this.setState({ criptomonedas: res.Data }))
      .catch(err =>{
        console.log(err);
      })
  };

  onSelect = e => {
    e.preventDefault();
    const moneda = this.moneda.current.value;
    const criptomoneda = this.criptomoneda.current.value;
    if (!moneda || !criptomoneda) {
      this.setState({ error: true }, () => setTimeout(() => this.setState({ error: false }), 2500));
      return null;
    }
    this.props.onSelect({ moneda, criptomoneda });
  };

  render() {
    const { criptomonedas } = this.state;
    return (
     <div>
       <form onSubmit={ this.onSelect }>
         <div className="row">
           <label>Elige tu Moneda</label>
           <select className="u-full-width" ref={ this.moneda }>
             <option value="">Elige tu Moneda</option>
             <option value="USD">Dolar Estadounidense</option>
             <option value="MXN">Peso Mexicano</option>
             <option value="GBP">Libras</option>
             <option value="EUR">Euros</option>s
           </select>
         </div>

         <div className="row">
           <div>
             <label>Elige tu Criptomoneda</label>
             <select className="u-full-width" ref={ this.criptomoneda }>
               <option value="">Elige tu Criptomoneda</option>
               {
                 criptomonedas.map(cp => (
                   <option value={ cp.CoinInfo.Name } key={ cp.CoinInfo.Id }>{ cp.CoinInfo.FullName }</option>
                 ))
               }

             </select>
           </div>
         </div>
         <input className="button-primary u-full-width" type="submit" value="Cotizar" />
       </form>

       {
         this.state.error ? <div className="error">*Todos los campos son requeridos</div> : ''
       }
     </div>
    );
  }
}

export default Formulario;
