import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SosButton from './components/SosButton';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { api, contatoDaApi } from './api';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateApp() {
  const { user, isAuthenticated, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactsError, setContactsError] = useState('');
  const [sosCount, setSosCount] = useState(0);
  const navigate = useNavigate();

  const doLogout = () => {
    logout();
    setContacts([]);
    navigate('/login', { replace: true });
  };

  const loadContacts = useCallback(async () => {
    try {
      const { data } = await api.get('/api/contatos');
      setContacts(data.map(contatoDaApi));
      setContactsError('');
    } catch (error) {
      if (error.response?.status === 401) doLogout();
      else setContactsError('Não foi possível carregar os contatos. Verifique a API e o banco.');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadContacts();
  }, [isAuthenticated, loadContacts]);

  async function addContact(contact) {
    if (contacts.length >= 5) return false;
    try {
      const { data } = await api.post('/api/contatos', {
        nome: contact.name, telefone: contact.phone, parentesco: contact.relation,
      });
      setContacts(prev => [...prev, contatoDaApi(data)]);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Falha ao salvar contato.');
    }
  }

  async function removeContact(id) {
    try {
      await api.delete(`/api/contatos/${id}`);
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (error) {
      throw new Error(error.response?.data?.mensagem || 'Não foi possível remover o contato.');
    }
  }

  if (!isAuthenticated) return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Register />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>;

  return <ProtectedRoute><div className={darkMode ? 'app dark' : 'app'}>
    <Header user={{ name: user?.nome_completo || 'Usuário' }} />
    <main className="page">
      <div className="session-bar">
        <span>Sessão: <strong>{user?.nome_completo}</strong></span>
        <button type="button" className="logout-btn" onClick={doLogout}>Sair</button>
      </div>
      {contactsError && <div role="alert" className="form-message">{contactsError}</div>}
      <Routes>
        <Route path="/" element={<Home contacts={contacts} onSendSos={() => setSosCount(c => c + 1)} sosCount={sosCount} />} />
        <Route path="/contatos" element={<Contacts contacts={contacts} onAdd={addContact} onRemove={removeContact} />} />
        <Route path="/perfil" element={<Profile user={user} onSave={() => {}} />} />
        <Route path="/configuracoes" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <BottomNav />
    <SosButton onSend={() => setSosCount(c => c + 1)} />
  </div></ProtectedRoute>;
}

export default function App() {
  return <AuthProvider><PrivateApp /></AuthProvider>;
}
