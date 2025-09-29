// Utilitário para templates de email
export const emailTemplates = {
  // Template para reset de senha com design profissional
  passwordReset: (nome, resetLink) => `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; padding: 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        
        <!-- Header com logo e gradiente -->
        <div style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 30%, #f59e0b 60%, #facc15 100%); padding: 40px 20px; text-align: center; position: relative;">
          <div style="margin-bottom: 15px;">
            <img src="cid:logoCoins" alt="Coins for Study" style="width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.2); padding: 10px; backdrop-filter: blur(10px);" />
          </div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            🔒 Redefinição de Senha
          </h1>
          <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">
            Solicitação de alteração de senha
          </p>
        </div>

        <!-- Conteúdo principal -->
        <div style="padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #333; margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
              Olá, ${nome}! 👋
            </h2>
            <p style="color: #666; font-size: 16px; margin: 0;">
              Recebemos sua solicitação de redefinição
            </p>
          </div>

          <div style="background: linear-gradient(45deg, #fef2f2, #fef7ed); border-radius: 8px; padding: 25px; margin: 25px 0; border-left: 4px solid #f59e0b;">
            <p style="color: #555; margin: 0 0 15px 0; font-size: 16px;">
              🔑 <strong>Alteração de senha solicitada</strong>
            </p>
            <p style="color: #555; margin: 0; font-size: 15px;">
              Clique no botão abaixo para definir uma nova senha segura para sua conta.
            </p>
          </div>

          <!-- Dicas de segurança -->
          <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 25px 0; border: 1px solid #e0f2fe;">
            <h3 style="color: #0369a1; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
              �️ Dicas de segurança:
            </h3>
            <ul style="color: #0369a1; margin: 0; padding-left: 20px; font-size: 14px;">
              <li style="margin-bottom: 8px;">Use uma senha forte com pelo menos 8 caracteres</li>
              <li style="margin-bottom: 8px;">Combine letras maiúsculas, minúsculas, números e símbolos</li>
              <li>Nunca compartilhe sua senha com ninguém</li>
            </ul>
          </div>

          <!-- Botão CTA -->
          <div style="text-align: center; margin: 35px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; background: linear-gradient(45deg, #f59e0b, #ea580c); color: #fff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4); transition: all 0.3s ease;">
              🔑 Redefinir minha senha
            </a>
          </div>

          <!-- Aviso de segurança -->
          <div style="background: rgba(220, 38, 38, 0.05); border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 4px solid #dc2626;">
            <p style="color: #dc2626; font-size: 14px; margin: 0; font-weight: 500;">
              ⚠️ <strong>Importante:</strong> Se você não solicitou essa redefinição, ignore este e-mail. Este link expira em <strong>1 hora</strong> por motivos de segurança.
            </p>
          </div>

          <!-- Informação adicional -->
          <div style="text-align: center; padding: 20px; background: rgba(124, 58, 237, 0.05); border-radius: 8px; margin-top: 25px;">
            <p style="color: #7C3AED; font-size: 14px; margin: 0; font-weight: 500;">
              💡 <strong>Lembrete:</strong> Mantenha sua conta sempre segura e atualize sua senha regularmente!
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #e2e8f0;">
          <div style="margin-bottom: 10px;">
            <img src="cid:logoCoins" alt="Coins for Study" style="width: 40px; height: 40px; opacity: 0.6;" />
          </div>
          <p style="margin: 0 0 5px 0; font-size: 13px; color: #64748b; font-weight: 500;">
            Coins for Study © ${new Date().getFullYear()}
          </p>
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">
            Transformando aprendizado em conquistas! 🎓
          </p>
        </div>
      </div>

      <!-- Rodapé adicional (fora do card) -->
      <div style="text-align: center; margin-top: 20px; padding: 0 20px;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          Este e-mail foi enviado automaticamente. Por favor, não responda.
        </p>
      </div>
    </div>
  `,

  // Template para email de boas-vindas
  welcomeUser: (nome) => `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(90deg, #7C3AED, #C084FC); padding: 20px; text-align: center; color: #fff;">
          <h1 style="margin: 0; font-size: 22px;">Bem-vindo ao Coins for Study 🎉</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333; margin-top: 0;">Olá, ${nome}!</h2>
          <p style="color: #555; line-height: 1.6;">
            Estamos felizes em ter você com a gente! 🪙  
            Agora você pode explorar nossas atividades, acumular moedas e trocar por recompensas.
          </p>
          <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #06B6D4; margin: 20px 0;">
            <p style="color: #0369a1; font-size: 14px; margin: 0; line-height: 1.5;">
              <strong>🚀 Próximos passos:</strong><br/>
              • Complete seu perfil para ganhar suas primeiras moedas<br/>
              • Explore as atividades disponíveis<br/>
              • Comece a acumular moedas estudando!
            </p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/login" 
               style="background: #FACC15; color: #000; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
              ✨ Acessar minha conta
            </a>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">
            Dica: complete seu perfil para ganhar suas primeiras moedas 😉
          </p>
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p style="margin: 0;">Coins for Study © ${new Date().getFullYear()}</p>
          <p style="margin: 5px 0 0 0;">Transformando aprendizado em conquistas! 🎓</p>
        </div>
      </div>
    </div>
  `,

  // Template genérico
  generic: (titulo, nome, conteudo, botao = null) => `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(90deg, #7C3AED, #C084FC); padding: 20px; text-align: center; color: #fff;">
          <h1 style="margin: 0; font-size: 22px;">🪙 Coins for Study</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333; margin-top: 0;">${titulo}</h2>
          <p style="color: #555; line-height: 1.6;">Olá <b>${nome}</b>,</p>
          <div style="color: #555; line-height: 1.6;">
            ${conteudo}
          </div>
          ${
            botao
              ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${botao.link}" style="background: ${
                  botao.cor || "#FACC15"
                }; color: ${
                  botao.corTexto || "#000"
                }; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                ${botao.texto}
              </a>
            </div>
          `
              : ""
          }
        </div>
        <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p style="margin: 0;">Coins for Study © ${new Date().getFullYear()}</p>
          <p style="margin: 5px 0 0 0;">Transformando aprendizado em conquistas! 🎓</p>
        </div>
      </div>
    </div>
  `,
};
