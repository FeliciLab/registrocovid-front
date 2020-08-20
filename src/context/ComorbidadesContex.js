import React, { createContext, useState, useContext } from 'react';

const ComorbidadesContext = createContext();

function ComorbidadeProvider({ children }) {
  const [comorbidades, setComorbidades] = useState([]);
  const [cards, setCards] = useState([]);

  const handleComorbidade = comorbidadeId => {
    if (comorbidades.some(id => id === comorbidadeId)) {
      const removeId = comorbidades.filter(id => {
        return id !== comorbidadeId;
      });
      setComorbidades(removeId);
    } else {
      setComorbidades(prevComor => [...prevComor, comorbidadeId]);
    }
  };

  const addCard = (selectedField, doencas) => {
    const { id, descricao } = selectedField;
    if (cards.some(card => card.id === id)) {
      return;
    }
    const filteredDoencas = doencas.filter(
      doenca => doenca.tipo_doenca_id === id,
    );
    setCards(prevCards => [
      ...prevCards,
      { id, doencas: filteredDoencas, descricao },
    ]);
  };

  const removeCard = (id, doencas) => {
    const removeCardId = cards.filter(card => {
      return card.id !== id;
    });
    const doencasIds = doencas.map(doenca => doenca.id);
    const comorbidadesIds = comorbidades.filter(id => {
      return !doencasIds.includes(id);
    });

    setComorbidades(comorbidadesIds);
    setCards(removeCardId);
  };

  return (
    <ComorbidadesContext.Provider
      value={{ comorbidades, handleComorbidade, addCard, cards, removeCard }}>
      {children}
    </ComorbidadesContext.Provider>
  );
}

function useComorbidade() {
  const context = useContext(ComorbidadesContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { useComorbidade, ComorbidadeProvider };
