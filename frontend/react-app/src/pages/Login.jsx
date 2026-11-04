import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  async function enviar(event) {
    event.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const { data } = await api.post('/login', { login, senha });
      saveSession(data);
      navigate('/', { replace: true });
    } catch (error) {
      setErro(error.response?.data?.mensagem || 'Não foi possível entrar. Confira a API.');
    } finally {
      setCarregando(false);
    }
  }

  return <main className="login-screen">
    <section className="login-card">
      <div className="login-mark" aria-hidden="true">SOS</div>
      <p className="eyebrow">SOS EMERGÊNCIA</p>
      <h1>Bem-vindo(a)</h1>
      <p className="login-description">Entre para acessar seus contatos de emergência.</p>
      <form className="form login-form" onSubmit={enviar}>
        <label>Login ou e-mail
          <input autoComplete="username" value={login} onChange={e => setLogin(e.target.value)} required placeholder="Seu login ou e-mail" />
        </label>
        <label>Senha
          <input type="password" autoComplete="current-password" value={senha} onChange={e => setSenha(e.target.value)} required placeholder="Sua senha" />
        </label>
        {erro && <p className="form-message" role="alert">{erro}</p>}
        <button className="btn primary" type="submit" disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
      </form>
      <p className="login-hint">Ainda não tem cadastro? <Link to="/registro">Criar conta</Link></p>
    </section>
  </main>;
}
