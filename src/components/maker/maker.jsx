import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../edit/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const navigateState = useNavigate().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(navigateState && navigateState.id);
  const navigate = useNavigate();

  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCard(userId, (cards) => {
      setCards(cards);
    });
    // 언마운트 되었을때 아래 함수를 실행함.
    return () => {
      stopSync();
    };
  }, [userId, cardRepository]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [userId, navigate, authService]);
  // const addCard = (card) => {
  //   const updated = [...cards, card];
  //   setCards(updated);
  // };
  const createOrUpdateCard = (card) => {
    // updated에 객체를 복사하여 담는다.
    // const updated = { ...cards };
    // 객체의 id와 불러오는 객체의 key가 동일하기 때문에
    // 내가 원하는 순번의 객체를 수정할 수 있다.
    // card에는 객체 자체가 담겨있다.
    // updated[card.id] = card;
    // setCards(updated);
    // 위와 같이 해도 되고 아래와 같이 이전 상태를 가져와서 콜백함수로 넘겨줘도 된다ㅣ.
    setCards((cards) => {
      // 원래 가지고 있던 cards state를 모두 가져와서
      const updated = { ...cards };
      // state 상태 값에 추가한다.
      updated[card.id] = card;
      return updated;
    });
    // state가 없데이트 되고 변경된 state값을 upload의 매개변수로 전달하여 data가 업데이트 되도록 한다.
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      // 해당하는 객체를 없앤다.
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
