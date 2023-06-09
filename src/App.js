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
  };

  // The second parameter to setState() is an optional callback function that will be executed once setState
  // is completed and the component is re-rendered.

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

  onSaveButtonClick = () => { // Guthias ajudou com a lógica
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      savedCards,
      cardTrunfo,
    } = this.state;

    const newCard = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }

    savedCards.push(newCard);

    this.setState(() => ({ cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    }));
  };

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
      savedCards,
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

        {
          savedCards.map((element) => (
            <Card
              key={ element.cardName }
              cardName={ element.cardName }
              cardDescription={ element.cardDescription }
              cardAttr1={ element.cardAttr1 }
              cardAttr2={ element.cardAttr2 }
              cardAttr3={ element.cardAttr3 }
              cardImage={ element.cardImage }
              cardRare={ element.cardRare }
              cardTrunfo={ element.cardTrunfo }
            />))

        }

      </div>
    );
  }
}

export default App;
