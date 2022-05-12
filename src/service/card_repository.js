import { getDatabase, onValue, ref, remove, set, off } from "firebase/database";

class CardRepository {
  constructor() {
    this.db = getDatabase();
  }
  syncCard(userId, onUpdate) {
    const dbRef = ref(this.db, `${userId}/cards`);
    onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => {
      off(dbRef);
    };
  }

  saveCard(userId, card) {
    set(ref(this.db, `${userId}/cards/${card.id}`), card);
  }
  removeCard(userId, card) {
    remove(ref(this.db, `${userId}/cards/${card.id}`), card);
  }
}

export default CardRepository;
