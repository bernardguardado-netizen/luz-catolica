import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../firebase';

const IntentionsWall = () => {
  const [intentions, setIntentions] = useState([]);
  const [newIntention, setNewIntention] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  // Connect to Firebase Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'intentions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const intentionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setIntentions(intentionsData);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleAddIntention = async (e) => {
    e.preventDefault();
    if (!newIntention.trim()) return;

    try {
      await addDoc(collection(db, 'intentions'), {
        text: newIntention,
        author: author.trim() || 'Anónimo',
        prayers: 0,
        createdAt: serverTimestamp()
      });
      setNewIntention('');
      setAuthor('');
    } catch (error) {
      console.error("Error publicando intención:", error);
      alert("Hubo un error publicando la intención. Intenta nuevamente.");
    }
  };

  const handlePray = async (id) => {
    try {
      const intentionRef = doc(db, 'intentions', id);
      // Inform Firestore to increment the 'prayers' numeric field by 1 atomically
      await updateDoc(intentionRef, {
        prayers: increment(1)
      });
    } catch (error) {
      console.error("Error sumando oración:", error);
    }
  };

  return (
    <div className="animate-fade-in flex-col" style={{ gap: 'var(--spacing-xl)' }}>
      <div className="text-center">
        <h2 style={{ fontSize: 'var(--text-3xl)' }}>Muro de Intenciones Mundial</h2>
        <p style={{ fontSize: 'var(--text-lg)' }}>Donde la iglesia en todo el mundo se une a rezar por ti.</p>
      </div>

      <form onSubmit={handleAddIntention} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <h3 style={{ margin: 0, fontSize: 'var(--text-xl)' }}>Deja tu petición</h3>
        <input 
          type="text" 
          placeholder="Tu Nombre (Opcional)" 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-lg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-border)' }}
        />
        <textarea 
          placeholder="Escribe tu intención que necesita de oraciones..." 
          value={newIntention}
          onChange={(e) => setNewIntention(e.target.value)}
          rows={3}
          style={{ padding: 'var(--spacing-md)', fontSize: 'var(--text-lg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-border)', resize: 'vertical' }}
          required
        />
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Publicar Globalmente</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <h3 style={{ fontSize: 'var(--text-2xl)' }}>Comunidad Rezando Hoy</h3>
        
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: 'var(--text-lg)' }}>Conectando con la red global...</p>
        ) : intentions.length === 0 ? (
          <p style={{ textAlign: 'center', fontStyle: 'italic', fontSize: 'var(--text-lg)' }}>Sé el primero en dejar una intención para que todos oremos por ti.</p>
        ) : (
          intentions.map(int => (
            <div key={int.id} className="glass-panel" style={{ borderLeft: '4px solid var(--color-accent)' }}>
              <p style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--spacing-sm)' }}>"{int.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', fontSize: 'var(--text-md)' }}>- {int.author}</span>
                <button 
                  className="btn"
                  onClick={() => handlePray(int.id)}
                  style={{ fontSize: 'var(--text-md)', padding: 'var(--spacing-sm) var(--spacing-md)', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', background: 'transparent' }}
                >
                  🙏 He rezado juntos ({int.prayers})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IntentionsWall;
