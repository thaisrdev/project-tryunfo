import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: '',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [], // array de objetos das cartas criadas
  };

  onInputChange = (event) => {
    const { name, checked, value } = event.target;
    const type = (name === 'cardTrunfo') ? checked : value;
    this.setState({ [name]: type }, this.buttonEnabler);
  }; // The second parameter to setState() is an optional callback function that will be executed once setState is completed and the component is re-rendered.

  buttonEnabler = () => {
    const min = 0;
    const max = 90;
    const sum = 210;
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare } = this.state;
    if (cardName !== ''
      && cardDescription !== ''
      && cardImage !== ''
      && cardRare !== ''
      && Number(cardAttr1) >= min
      && Number(cardAttr1) <= max
      && Number(cardAttr2) >= min
      && Number(cardAttr2) <= max
      && Number(cardAttr3) >= min
      && Number(cardAttr3) <= max
      && (Number(cardAttr1)
      + Number(cardAttr2) + Number(cardAttr3)) <= sum) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  onSaveButtonClick = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      savedCards } = this.state;

    const newCard = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare };

    savedCards.push(newCard);

    this.setState(() => ({ cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
    }));
  };

  // GUTHIAS AJUDOU COM A LÓGICA

  // since setState works in an asynchronous way. That means after calling setState the this.state variable is not immediately changed.
  // so if you want to perform an action immediately after setting state on a state variable and then return a result, a callback will be useful

  //  pegar informacoes das cartas salvar no savedCards, depois fazer uma callback pra o meu setState e depois limpar as informações do estado de novo

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}
export default App;
