const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuario = require('./usuarios-modelo')
const { InvalidArgumentError } = require('../erros') 
const bcrypt = require('bcrypt')

function verificaUsuario(usuario){
  
  if(!usuario){
    throw new InvalidArgumentError('Não existe usuário com este email!')
  }
}

async function varificaSenha(senha, senhaHash){
  const senhaValida = await bcrypt.compare(senha, senhaHash)
  console.log(senhaValida)
  if(!senhaValida){
    throw new InvalidArgumentError('Email ou senha Inválidos')
  }
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    session: false
  }, async (email, senha, done) =>{
    
    try {
      const usuario = await Usuario.buscaPorEmail(email)
      verificaUsuario(usuario)
      await varificaSenha(senha, usuario.senhaHash)
      done(null, usuario);
    } catch (error) {
      done(error)
    }

  })
)