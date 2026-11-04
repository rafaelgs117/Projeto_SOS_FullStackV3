import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Register() {
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', senha: '' });
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      await api.post('/registro', form);
      setMessage('Cadastro concluído. Agora entre com seu e-mail e senha.');
      navigate('/login', { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.mensagem || 'Não foi possível cadastrar.');
    } finally { setBusy(false); }
  }
  return <main className="login-screen"><section className="login-card">
    <p className="eyebrow">SOS EMERGÊNCIA</p><h1>Criar cadastro</h1>
    <form className="form login-form" onSubmit={submit}>
      <label>Nome completo<input required value={form.nome} onChange={e => setForm({...form,nome:e.target.value})}/></label>
      <label>Telefone<input required value={form.telefone} onChange={e => setForm({...form,telefone:e.target.value})}/></label>
      <label>E-mail<input type="email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})}/></label>
      <label>Senha<input type="password" minLength="4" required value={form.senha} onChange={e => setForm({...form,senha:e.target.value})}/></label>
      <button className="btn primary" disabled={busy}>{busy ? 'Cadastrando...' : 'Cadastrar'}</button>
      {message && <p role="status" className="form-message">{message}</p>}
    </form>
    <p><Link to="/login">Voltar para login</Link></p>
  </section></main>;
}
