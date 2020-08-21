import React, { createContext, useState, useContext } from 'react';

const ComorbidadesContext = createContext();

function ComorbidadeProvider({ children }) {
  const [doencas, setDoencas] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  const [corticosteroides, setCorticosteroides] = useState([]);
  const [cards, setCards] = useState([]);

  const removeOrgaos = () => {
    setOrgaos([]);
  }

  const removeCorticosteroides = () => {
    setCorticosteroides([]);
  }

  const handleOrgaoId = orgaoId => {
    if (orgaos.some(id => id === orgaoId)) {
      const filteredOrgaos = orgaos.filter(id => {
        return id !== orgaoId;
      });
      setOrgaos(filteredOrgaos);
    } else {
      setOrgaos(prevOrgaos => [...prevOrgaos, orgaoId]);
    }
  };

  const handleCorticosteroideId = corticosteroidesId => {
    if (corticosteroides.some(id => id === corticosteroidesId)) {
      const filteredCorticosteroides = corticosteroides.filter(id => {
        return id !== corticosteroidesId;
      });
      setCorticosteroides(filteredCorticosteroides);
    } else {
      setCorticosteroides(prevCorticosteroides => [...prevCorticosteroides, corticosteroidesId]);
    }

    console.log(corticosteroides);
  };

  const handleDoencaId = doencaId => {
    if (doencas.some(id => id === doencaId)) {
      const filteredDoencas = doencas.filter(id => {
        return id !== doencaId;
      });
      setDoencas(filteredDoencas);
    } else {
      setDoencas(prevDoencas => [...prevDoencas, doencaId]);
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
    const filteredCards = cards.filter(card => {
      return card.id !== id;
    });
    const doencasIds = doencas.map(doenca => doenca.id);
    const filteredDoencasIds = doencasIds.filter(id => {
      return !doencasIds.includes(id);
    });

    setDoencas(filteredDoencasIds);
    setCards(filteredCards);
  };

  return (
    <ComorbidadesContext.Provider
      value={{
        doencas,
        handleDoencaId,
        addCard,
        cards,
        removeCard,
        handleOrgaoId,
        handleCorticosteroideId,
        removeOrgaos,
        removeCorticosteroides
      }}
    >
      {children}
    </ComorbidadesContext.Provider>
  );
}

function useComorbidade() {
  const context = useContext(ComorbidadesContext);

  return context;
}

export { useComorbidade, ComorbidadeProvider };
